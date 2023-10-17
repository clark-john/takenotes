import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Notebook } from './dto/notebook';
import { CurrentUserId } from 'src/decorators';
import { Note } from './dto/note';
import { DetanticService, SavedService } from 'src/services';
import { deserializeDate } from 'src/utils';
import { type Model } from 'detantic';

@Resolver()
export class SavedResolver {
	notes: Model<Note>;
	notebooks: Model<Notebook>;
	
	constructor(
		private saved: SavedService,
		private dt: DetanticService
	) {
		this.notes = this.dt.createModel("notes", new Note);
		this.notebooks = this.dt.createModel("notebooks", new Notebook);
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
		return (await this.notes.findMany())
			.map(deserializeDate)
			.filter(({ savedBy }) => savedBy.includes(userId))
		;
	}

	@Query(() => [Notebook])
	async getSavedNotebooks(@CurrentUserId() userId: string){
		return (await this.notebooks.findMany())
			.map(deserializeDate)
			.filter(({ savedBy }) => savedBy.includes(userId))
		;
	}
}
