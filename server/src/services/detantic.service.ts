import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseModel, Detantic } from 'detantic';

@Injectable()
export class DetanticService {
	private detantic: ReturnType<typeof Detantic>;
	
	constructor(private config: ConfigService){
		this.detantic = Detantic(this.config.get("DETA_PROJECT_KEY"));
	}
	
	createModel<T extends BaseModel>(basename: string, model: BaseModel){
		return this.detantic.createModel<T>(basename, model);
	}
}
