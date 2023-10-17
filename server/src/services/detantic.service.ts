import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseModel, Detantic, Model } from 'detantic';

@Injectable()
export class DetanticService {
	private detantic: ReturnType<typeof Detantic>;
	
	constructor(private config: ConfigService){
		this.detantic = Detantic(this.config.get("DETA_PROJECT_KEY"));
	}
	
	createModel<T extends BaseModel>(basename: string, model: T): Model<T> {
		return this.detantic.createModel(basename, model);
	}
}
