import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Notebook } from './dto/notebook';
import { NoteBase, NotebookBase, SavedBase } from 'src/bases';
import { CurrentUserId } from 'src/decorators';
import { Note } from './dto/note';
import { NoteService, NotebookService, SavedService } from 'src/services';
import { keyToId } from 'src/utils';
import { DetaObject } from 'src/types';

@Resolver()
export class SavedResolver {
	constructor(
		private saved: SavedService,
		private nb: NotebookService,
		private note: NoteService
	) {}

	@Mutation(() => Notebook)
	async saveNotebook(
		@CurrentUserId() userId: string,
		@Args('id', { type: () => String }) id: string
	) {
		return this.saved.updateSaved(true, userId, id, 'notebook');
	}

	@Mutation(() => Notebook)
	async unsaveNotebook(
		@CurrentUserId() userId: string,
		@Args('id', { type: () => String }) id: string
	) {
		return this.saved.updateSaved(false, userId, id, 'notebook');
	}

	@Mutation(() => Note)
	async saveNote(
		@CurrentUserId() userId: string,
		@Args('id', { type: () => String }) id: string
	) {
		return this.saved.updateSaved(true, userId, id, 'note');
	}

	@Mutation(() => Note)
	async unsaveNote(
		@CurrentUserId() userId: string,
		@Args('id', { type: () => String }) id: string
	) {
		return this.saved.updateSaved(false, userId, id, 'note');
	}

	@Query(() => [Note])
	async getSavedNotes(@CurrentUserId() userId: string){
		return (await NoteBase.fetch({ userId, saved: true })).items.map((x: Note & DetaObject) => {
			x.createdAt = new Date(x.createdAt as Date);
			return keyToId(x);
		});
	}

	@Query(() => [Notebook])
	async getSavedNotebooks(@CurrentUserId() userId: string){
		return (await NotebookBase.fetch({ userId, saved: true })).items.map((x: Notebook & DetaObject) => {
			x.createdAt = new Date(x.createdAt as Date);
			return keyToId(x);
		});
	}
}
