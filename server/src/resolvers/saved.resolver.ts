import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Notebook } from './dto/notebook';
import { CurrentUserId } from 'src/decorators';
import { Note } from './dto/note';
import { DetanticService, SavedService } from 'src/services';
import { deserializeDate } from 'src/utils';
import { Model } from 'detantic';

@Resolver()
export class SavedResolver {
	notes: Model<Note>;
	notebooks: Model<Notebook>;
	constructor(
		private saved: SavedService,
		private dt: DetanticService
	) {
		const deta = this.dt.getInstance();
		this.notes = deta.createModel("notes", Note.createSchema());
		this.notebooks = deta.createModel("notebooks", Notebook.createSchema());
	}

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
		return (await this.notes.findMany({ userId, saved: true })).map(deserializeDate);
	}

	@Query(() => [Notebook])
	async getSavedNotebooks(@CurrentUserId() userId: string){
		return (await this.notebooks.findMany({ userId, saved: true })).map(deserializeDate);
	}
}
