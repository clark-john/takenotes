import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Detantic } from 'detantic';

@Injectable()
export class DetanticService {
	private detantic: ReturnType<typeof Detantic>;
	constructor(private config: ConfigService){
		this.detantic = Detantic(this.config.get("DETA_PROJECT_KEY"));
	}
	getInstance(){
		return this.detantic;
	}
}
