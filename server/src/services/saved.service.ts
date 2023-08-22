import { BadRequestException, Injectable } from '@nestjs/common';
import { Note } from 'src/resolvers/dto/note';
import { Notebook } from 'src/resolvers/dto/notebook';
import { NoteService } from './note.service';
import { NotebookService } from './notebook.service';
import { DetanticService } from './detantic.service';
import { Model } from 'detantic';

@Injectable()
export class SavedService {
	notes: Model<Note>;
	notebooks: Model<Notebook>;
	constructor(
		private nb: NotebookService, 
		private note: NoteService,
		private dt: DetanticService
	) {
		this.notes = this.dt.createModel("notes", Note.createSchema());
		this.notebooks = this.dt.createModel("notebooks", Notebook.createSchema());
	}

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
			await this.notes.updateById({ saved: isSave }, obj!.id);
		} else {
			await this.notebooks.updateById({ saved: isSave }, obj!.id);
		}

		return obj;
	}
}
