import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'detantic';
import { remove } from 'lodash';
import { Note } from 'src/resolvers/dto/note';
import { Notebook } from 'src/resolvers/dto/notebook';
import { DetanticService } from './detantic.service';

@Injectable()
export class SavedService {
	notes: Model<Note>;
	notebooks: Model<Notebook>;
	
	constructor(private dt: DetanticService) {
		this.notes = this.dt.createModel("notes", new Note);
		this.notebooks = this.dt.createModel("notebooks", new Notebook);
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
			obj = await this.notes.findOne({ id })
		} else if (type === 'notebook') {
			obj = await this.notebooks.findOne({ id })
		} else {
			throw new Error('Unknown type');
		}
		
		if (!obj) {
			throw new NotFoundException("Note/notebook not found");
		}

		const hasUserId = obj.savedBy.includes(userId);

		if (isSave ? hasUserId : !hasUserId) {
			throw new BadRequestException(`Already ${isSave ? 'save' : 'unsave'}d`);
		}

		// update object's saved property
		if (isSave) {
			obj.savedBy.push(userId)
		} else {
			remove(obj.savedBy, x => x === userId);
		}

		if (type === 'note') {
			await this.notes.updateById({ savedBy: obj.savedBy }, obj!.id);
		} else {
			await this.notebooks.updateById({ savedBy: obj.savedBy }, obj!.id);				
		}

		return obj;
	}
}
