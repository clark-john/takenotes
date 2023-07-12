import { NotFoundException } from '@nestjs/common';
import { Injectable } from "@nestjs/common";

import { NotebookBase } from "src/bases";
import { Notebook } from 'src/resolvers/dto/notebook';
import { DetaObject } from 'src/types';
import { keyToId } from 'src/utils';

type NotebookType = Notebook & DetaObject | null;

@Injectable()
export class NotebookService {
	async findOne(currentId: string, id: string): Promise<NotebookType> {
		const i = (await NotebookBase.fetch({ userId: currentId, key: id })).items;
		const nb = i.find(x => id === (keyToId(x)).id) as NotebookType;
		if (!nb) {
			throw new NotFoundException("Notebook not found");
		}
		return nb;
	}
}
