import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { AddNote, Note, UpdateNote } from './dto/note';
import * as chroma from 'chroma-js';
import { randomUUID } from 'crypto';
import { NotebookService } from 'src/services/notebook.service';
import { CurrentUserId } from 'src/decorators';
import { NoteBase } from 'src/bases';
import { DetaObject } from 'src/types';
import { keyToId } from 'src/utils';
import { keys, unset } from 'lodash';

@Resolver()
export class NoteResolver {
	constructor(
		private nb: NotebookService
	){}

	@Mutation(() => Note)
	async createNote(
		@CurrentUserId() currentId: string,
		@Args('note') { backgroundColor, title, content, notebookId }: AddNote
	) {
		const note = new Note() as Note & DetaObject;
		const createdAt = new Date();
		Object.assign(note, {
			backgroundColor: backgroundColor || chroma.random().hex('rgb'),
			content,
			title,
			createdAt,
			notebookId,
			userId: currentId
		} as Note);
		await this.nb.findOne(currentId, notebookId);
		return await (async () => {
			const n = keyToId(await NoteBase.put(note, randomUUID())) as Note;
			n.createdAt = createdAt;
			return n;
		})();
	}

	@Mutation(() => String)
	async updateNote(
		@CurrentUserId() currentId: string,
		@Args('note') { backgroundColor, title, content, id }: UpdateNote
	) {
		const note = await this.findOne(currentId, id);
		const updates = this.removeEmpty({
			title,
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
		const note = await this.findOne(currentId, id);
		await NoteBase.delete(note.id);		
		return note;
	}

	private async findOne(currentId: string, id: string){
		const items = (await NoteBase.fetch({ userId: currentId, key: id })).items;
		const note = items.find(x => id === (keyToId(x)).id) as Note & DetaObject;
		if (!note) {
			throw new NotFoundException("Note not found");
		}
		return note;
	}
	private removeEmpty(obj: Record<string, any>){
		keys(obj).forEach(x => {
			if (!obj[x]) {
				unset(obj, x);
			}
		});
		return obj;
	}
}
