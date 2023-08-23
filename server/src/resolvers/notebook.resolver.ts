import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Note } from './dto/note';
import { AddNotebook, Notebook, UpdateNotebook } from './dto/notebook';
import * as chroma from 'chroma-js';
import { CurrentUserId } from 'src/decorators';
import { DetanticService } from 'src/services';
import { Model } from 'detantic';
import { deserializeDate } from 'src/utils';

@Resolver()
export class NotebookResolver {
	notes: Model<Note>;
	notebooks: Model<Notebook>;
	
	constructor(
		private dt: DetanticService
	) {
		this.notes = this.dt.createModel("notes", Note.createSchema());
		this.notebooks = this.dt.createModel("notebooks", Notebook.createSchema());
	}

	@Query(() => [Note])
	async getNotes(@Args('notebookId', { type: () => String }) id: string) {
		return (await this.notes.findMany({ notebookId: id })).map(deserializeDate);
	}

	@Query(() => [Notebook])
	async getNotebooks(
		@CurrentUserId() userId: string
	): Promise<Omit<Notebook, 'notes'>[]> {
		return (await this.notebooks.findMany({ userId })).map(deserializeDate);
	}

	@Query(() => [Notebook])
	async getPublicNotebooks(
		@Args({ 
			type: () => Number, 
			defaultValue: 10, 
			name: 'limit' 
		}) limit: number
	): Promise<Notebook[]> {
		return (await this.notebooks.findMany({ isPublic: true }, { limit }))
			.map(deserializeDate)
			.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1);
	}

	@Query(() => Notebook, { nullable: true })
	async getNotebookInfo(@Args('id', { type: () => String }) id: string) {
		return deserializeDate(await this.notebooks.findOne({ id }) as any);
	}

	@Mutation(() => Notebook)
	async createNotebook(
		@CurrentUserId() userId: string,
		@Args('notebook') { name, description, isPublic }: AddNotebook
	): Promise<Notebook> {
		return deserializeDate(await this.notebooks.insert({
			name,
			description,
			createdAt: new Date(),
			backgroundColor: chroma.random().hex('rgb'),
			userId,
			savedBy: [],
			isPublic
		}));
	}

	@Mutation(() => Notebook)
	async deleteNotebook(
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
