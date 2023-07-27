import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteBase } from 'src/bases';
import { Note } from 'src/resolvers/dto/note';
import { DetaObject } from 'src/types';
import { keyToId } from 'src/utils';

@Injectable()
export class NoteService {
	async findOne(currentId: string, id: string) {
		const items = (await NoteBase.fetch({ userId: currentId, key: id })).items;
		const note = items.find(x => id === keyToId(x).id) as Note & DetaObject;
		if (!note) {
			throw new NotFoundException('Note not found');
		}
		return note;
	}
}
