import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Note } from './dto/note';
import { AddNotebook, Notebook, UpdateNotebook } from './dto/notebook';
import * as chroma from 'chroma-js';
import { set } from 'lodash';
import { CurrentUserId } from 'src/decorators';
import { DetanticService } from 'src/services';
import { Model } from 'detantic';

@Resolver()
export class NotebookResolver {
	notes: Model<Note>;
	notebooks: Model<Notebook>;
	constructor(
		private dt: DetanticService
	) {
		const deta = this.dt.getInstance();
		this.notes = deta.createModel("notes", Note.createSchema());
		this.notebooks = deta.createModel("notebooks", Notebook.createSchema());
	}

	@Query(() => [Note])
	async getNotes(@Args('notebookId', { type: () => String }) id: string) {
		return (await this.notes.findMany({ notebookId: id })).map(x => {
			x.createdAt = new Date(x.createdAt);
			return x;
		});
	}

	@Query(() => [Notebook])
	async getNotebooks(
		@CurrentUserId() userId: string
	): Promise<Omit<Notebook, 'notes'>[]> {
		return (await this.notebooks.findMany({ userId })).map(x => {
			x.createdAt = new Date(x.createdAt);
			return x;
		});
	}

	@Query(() => Notebook, { nullable: true })
	async getNotebookInfo(@Args('id', { type: () => String }) id: string) {
		const nb = await this.notebooks.findOne({ id });
		set(nb, 'createdAt', new Date(nb.createdAt));
		return nb;
	}

	@Mutation(() => Notebook)
	async createNotebook(
		@CurrentUserId() userId: string,
		@Args('notebook') { name, description }: AddNotebook
	): Promise<Notebook> {
		const createdAt = new Date();
		const n = await this.notebooks.insert({
			name,
			description,
			createdAt,
			backgroundColor: chroma.random().hex('rgb'),
			userId,
			saved: false
		});
		// still no deserialization this 1.0.5, maybe will be added to 1.0.6 or 1.0.7 
		n.createdAt = createdAt;
		return n;
	}

	@Mutation(() => Notebook)
	async deleteNotebook(
		// @CurrentUserId() currentId: string,
		@Args('id', { type: () => String }) id: string
	) {
		const nb = await this.notebooks.deleteByKey(id);
		await this.notes.deleteMany({ notebookId: id });
		return nb;
	}

	@Mutation(() => Notebook)
	async updateNotebook(
		@CurrentUserId() currentId: string,
		@Args('notebook') { id, name, description }: UpdateNotebook
	) {
		try {
			return await this.notebooks.updateById({ name, description, userId: currentId }, id)
		} catch (e) {
			throw new NotFoundException('Notebook not found');
		}
	}
}
