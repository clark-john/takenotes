import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as chroma from 'chroma-js';
import { Model } from 'detantic';
import { Note, UpdateNote } from './dto/note';
import { CurrentUserId } from 'src/decorators';
import { deserializeDate, removeEmpty } from 'src/utils';
import { NoteService } from 'src/services/note.service';
import { DetanticService } from 'src/services';
import { ForbiddenException } from '@nestjs/common';

@Resolver()
export class NoteResolver {
	notes: Model<Note>;

	constructor(private note: NoteService, private dt: DetanticService) {
		this.notes = this.dt.createModel("notes", Note.createSchema());
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
		// const note = await this.note.findOne(currentId, id);
		const note = await this.notes.findOne({ id });
		if (note.userId != currentId){
			throw new ForbiddenException("Can't edit someone else's note");
		}
		const updates = removeEmpty({
			content,
			backgroundColor
		});
		await this.notes.updateById(updates, note.id);
		return 'update success';
	}

	@Mutation(() => Note)
	async deleteNote(
		@CurrentUserId() currentId: string,
		@Args('id', { type: () => String }) id: string
	) {
		const note = await this.notes.findOne({ id, userId: currentId });
		return await this.notes.deleteByKey((note as Note).id);
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
