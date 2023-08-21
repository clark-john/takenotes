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
		const deta = this.dt.getInstance();
		this.notes = deta.createModel("notes", Note.createSchema());
	}
	async findOne(currentId: string, id: string) {
		try {
			return await this.notes.findOne({ userId: currentId, id })
		} catch (e) {
			throw new NotFoundException('Note not found');
		}
	}
}
