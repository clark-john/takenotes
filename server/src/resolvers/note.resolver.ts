import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as chroma from 'chroma-js';
import { Model } from 'detantic';
import { Note, UpdateNote } from './dto/note';
import { CurrentUserId } from 'src/decorators';
import { deserializeDate, removeEmpty } from 'src/utils';
import { DetanticService } from 'src/services';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@Resolver()
export class NoteResolver {
	notes: Model<Note>;

	constructor(private dt: DetanticService) {
		this.notes = this.dt.createModel("notes", new Note);
	}

	@Mutation(() => Note)
	async createBlankNote(
		@CurrentUserId() currentId: string,
		@Args('notebookId', { type: () => String }) id: string
	) {
		return deserializeDate(await this.notes.insert({
			createdAt: new Date(),
			backgroundColor: chroma.random().set('hsl.l', 0.84).hex(),
			content: '',
			notebookId: id,
			userId: currentId,
			saved: false,
			isPublic: true,
			savedBy: []
		}));
	}

	@Mutation(() => String)
	async updateNote(
		@CurrentUserId() currentId: string,
		@Args('note') { backgroundColor, content, id }: UpdateNote
	) {		
		const note = await this.notes.findOne({ id });
		
		if (!note) {
			throw new NotFoundException("Note not found");
		}
		
		if (note.userId != currentId){
			throw new ForbiddenException("Can't edit someone else's note");
		}
		
		const updates = removeEmpty({
			content,
			backgroundColor
		});
		await this.notes.updateById(updates, note.id, { fetchId: false, objectData: note });
		return 'update success';
	}

	@Mutation(() => Note)
	async deleteNote(
		@CurrentUserId() currentId: string,
		@Args('id', { type: () => String }) id: string
	) {
		const note = await this.notes.findOne({ id, userId: currentId });

		if (!note) {
			throw new NotFoundException("Note not found");
		}

		if (note.userId != currentId){
			throw new ForbiddenException("Can't delete someone else's note");
		}

		return await this.notes.deleteById((note as Note).id, { fetchId: false, objectData: note });
	}

	@Query(() => Note, { nullable: true })
	async getNote(@Args('id', { type: () => String }) id: string) {
		const n = await this.notes.findOne({ id });
		const note = n;
		if (note) {
			return deserializeDate(note as Note);
		}
		return null;
	}
}
