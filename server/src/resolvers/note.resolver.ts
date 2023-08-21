import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Note, UpdateNote } from './dto/note';
import * as chroma from 'chroma-js';
import { NotebookService } from 'src/services/notebook.service';
import { CurrentUserId } from 'src/decorators';
import { removeEmpty } from 'src/utils';
import { NoteService } from 'src/services/note.service';
import { DetanticService } from 'src/services';
import { Model } from 'detantic';

@Resolver()
export class NoteResolver {
	notes: Model<Note>;

	constructor(private nb: NotebookService, private note: NoteService, private detantic: DetanticService) {
		const d = this.detantic.getInstance();
		this.notes = d.createModel("notes", Note.createSchema());
	}

	@Mutation(() => Note)
	async createBlankNote(
		@CurrentUserId() currentId: string,
		@Args('notebookId', { type: () => String }) id: string
	) {
		const createdAt = new Date();
		const note = await this.notes.insert({
			createdAt,
			backgroundColor: chroma.random().set('hsl.l', 0.84).hex(),
			content: '',
			notebookId: id,
			userId: currentId,
			saved: false
		});
		note.createdAt = createdAt;
		return note;
	}

	@Mutation(() => String)
	async updateNote(
		@CurrentUserId() currentId: string,
		@Args('note') { backgroundColor, content, id }: UpdateNote
	) {		
		const note = await this.note.findOne(currentId, id);
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
			note.createdAt = new Date(note.createdAt);
			return note;
		}
		return null;
	}
}
