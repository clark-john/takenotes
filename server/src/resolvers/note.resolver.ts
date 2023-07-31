import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddNote, Note, UpdateNote } from './dto/note';
import * as chroma from 'chroma-js';
import { randomUUID } from 'crypto';
import { NotebookService } from 'src/services/notebook.service';
import { CurrentUserId } from 'src/decorators';
import { NoteBase } from 'src/bases';
import { DetaObject } from 'src/types';
import { keyToId, removeEmpty } from 'src/utils';
import { NoteService } from 'src/services/note.service';
import { DetanticService } from 'src/services';
import { Model } from 'detantic';

@Resolver()
export class NoteResolver {
	notes: Model<Note>;
	constructor(private nb: NotebookService, private note: NoteService, private detantic: DetanticService) {
		const d = this.detantic.getInstance();
		this.notes = d.createModel<Note>("notes", Note.createSchema());
	}

	@Mutation(() => Note)
	async createNote(
		@CurrentUserId() currentId: string,
		@Args('note') { backgroundColor, content, notebookId }: AddNote
	) {
		const note = new Note() as Note & DetaObject;
		const createdAt = new Date();
		Object.assign(note, {
			backgroundColor: backgroundColor || chroma.random().hex('rgb'),
			content,
			createdAt,
			notebookId,
			userId: currentId,
			saved: false
		} as Note);
		await this.nb.findOne(currentId, notebookId);
		return await (async () => {
			const n = keyToId(await NoteBase.put(note, randomUUID())) as Note;
			n.createdAt = createdAt;
			return n;
		})();
	}

	@Mutation(() => Note)
	async createBlankNote(
		@CurrentUserId() currentId: string,
		@Args('notebookId', { type: () => String }) id: string
	) {
		const note = new Note() as Note & DetaObject;
		const obj = {
			createdAt: new Date(),
			backgroundColor: chroma.random().set('hsl.l', 0.84).hex(),
			content: '',
			notebookId: id,
			userId: currentId,
			saved: false
		};
		Object.assign(note, obj);
		const randomId = randomUUID();
		await NoteBase.put(obj as Note & DetaObject, randomId);
		return {
			id: randomId,
			...obj
		};
	}

	@Mutation(() => String)
	async updateNote(
		@CurrentUserId() currentId: string,
		@Args('note') { backgroundColor, content, id }: UpdateNote
	) {
		/*const [note] = await this.notes.findOne({ userId: currentId, id })
		const updates = removeEmpty({
			content,
			backgroundColor
		});
		await this.notes.updateById(updates, (note as Note).id);
		return 'update success';*/
		
		// code above is slow because of two get by key requests
		const note = await this.note.findOne(currentId, id);
		const updates = removeEmpty({
			content,
			backgroundColor
		});
		await NoteBase.update(updates, note.id);
		return 'update success';
	}

	@Mutation(() => Note)
	async deleteNote(
		@CurrentUserId() currentId: string,
		@Args('id', { type: () => String }) id: string
	) {
		const [note] = await this.notes.findOne({ id, userId: currentId });
		return await this.notes.deleteByKey((note as Note).id);
	}

	@Query(() => Note, { nullable: true })
	async getNote(@Args('id', { type: () => String }) id: string) {
		const [n] = await this.notes.findOne({ id });
		const note = n as Note;
		if (note) {
			note.createdAt = new Date(note.createdAt);
			return note;
		}
		return null;
	}
}
