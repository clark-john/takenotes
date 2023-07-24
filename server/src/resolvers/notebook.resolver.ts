import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Note } from './dto/note';
import { AddNotebook, Notebook } from './dto/notebook';
import { NotebookBase, NoteBase } from 'src/bases';
import { DetaObject } from 'src/types';
import { randomUUID } from 'crypto';
import * as chroma from 'chroma-js';
import { keyToId } from 'src/utils';
import { set } from 'lodash';
import { CurrentUserId } from 'src/decorators';
import { NotebookService } from 'src/services/notebook.service';

type NoteType = Note & DetaObject;
type Notes = Promise<NoteType[]>;

@Resolver()
export class NotebookResolver {
	constructor(
		private nb: NotebookService
	){}

	@Query(() => [Note])
	async getNotes(
		@Args('notebookId', { type: () => String }) id: string
	) {
		return (await NoteBase.fetch({ notebookId: id })).items.map(x => {
			x.createdAt = new Date(x.createdAt as string) as any;
			return keyToId(x);
		});
	}

	@Query(() => [Notebook])
	async getNotebooks(
		@CurrentUserId() userId: string
	): Promise<Omit<Notebook, 'notes'>[]> {
		const notebooks = await NotebookBase.fetch({ userId });
		return notebooks.items.map(x => {
			const y = keyToId(x);
			y.createdAt = new Date(x.createdAt as string);
			return y;
		});
	}

	@Query(() => Notebook, { nullable: true })
	async getNotebookInfo(@Args("id", { type: () => String }) id: string){
		const k = await NotebookBase.get(id);
		const nb = keyToId(k) as Notebook;
		set(nb, 'createdAt', new Date(nb.createdAt))
		return nb;
	}

	@Mutation(() => Notebook)
	async createNotebook(
		@CurrentUserId() userId: string,
		@Args('notebook') { name, description }: AddNotebook
	): Promise<Notebook> {
		const nb = new Notebook() as Notebook & DetaObject;
		const createdAt = new Date();
		Object.assign(nb, {
			name,
			description,
			createdAt,
			backgroundColor: chroma.random().hex('rgb'),
			userId
		} as Notebook);
		const notebook = keyToId(await NotebookBase.put(nb, randomUUID()));
		// resetting it to actual Date, because Deta is serializing it after put.
		set(notebook, 'createdAt', createdAt);
		return notebook;
	}

	@Mutation(() => Notebook)
	async deleteNotebook(
		@CurrentUserId() currentId: string,
		@Args('id', { type: () => String }) id: string
	) {
		const nb = await this.nb.findOne(currentId, id);
		await NotebookBase.delete(nb?.id ?? '');
		return nb;
	}
}
