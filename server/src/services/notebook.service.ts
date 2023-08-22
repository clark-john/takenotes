import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { Notebook } from 'src/resolvers/dto/notebook';
import { DetanticService } from './detantic.service';
import { Model } from 'detantic';

@Injectable()
export class NotebookService {
	notebooks: Model<Notebook>;
	constructor(private dt: DetanticService){
		this.notebooks = this.dt.createModel("notebooks", Notebook.createSchema());
	}
	async findOne(currentId: string, id: string): Promise<Notebook> {
		try {			
			return await this.notebooks.findOne({
				userId: currentId,
				id
			}) as Notebook;
		} catch (e) {
			throw new NotFoundException('Notebook not found');
		}
	}
}
