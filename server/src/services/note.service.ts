import { Injectable, NotFoundException } from '@nestjs/common';
import { Note } from 'src/resolvers/dto/note';
import { DetanticService } from './detantic.service';
import { Model } from 'detantic';

@Injectable()
export class NoteService {
	notes: Model<Note>;
	constructor(
		private dt: DetanticService
	) {
		this.notes = this.dt.createModel("notes", new Note);
	}
	async findOne(currentId: string, id: string) {
		try {
			return await this.notes.findOne({ userId: currentId, id })
		} catch (e) {
			throw new NotFoundException('Note not found');
		}
	}
}
