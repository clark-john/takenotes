import { BadRequestException, Injectable } from '@nestjs/common';
import { Note } from 'src/resolvers/dto/note';
import { NoteService } from './note.service';
import { NotebookService } from './notebook.service';
import { NoteBase, NotebookBase } from 'src/bases';

@Injectable()
export class SavedService {
	constructor(private nb: NotebookService, private note: NoteService) {}

	async updateSaved(
		isSave: boolean,
		userId: string,
		id: string,
		type: 'note' | 'notebook'
	) {
		let obj;

		// check object's type and find it by id
		if (type === 'note') {
			obj = (await this.note.findOne(userId, id as string)) as Note;
		} else if (type === 'notebook') {
			obj = await this.nb.findOne(userId, id);
		} else {
			throw new Error('Unknown type');
		}

		if (isSave ? obj?.saved : !obj?.saved) {
			throw new BadRequestException(`Already ${isSave ? 'save' : 'unsave'}d`);
		}

		// update object's saved property
		if (type === 'note') {
			await NoteBase.update({ saved: isSave }, obj!.id);
		} else {
			await NotebookBase.update({ saved: isSave }, obj!.id);
		}

		return obj;
	}
}
