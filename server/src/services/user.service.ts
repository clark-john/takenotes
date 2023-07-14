/*import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
	constructor(
		private jwt: JwtService,
		private config: ConfigService
	){}

	getAccessToken(payload: any) {
		payload.exp = this.getExpInMinutes(10);
		return this.jwt.sign(payload, {
			secret: this.config.get('JWT_ACCESS_SECRET')
		});
	}
	getRefreshToken(payload: any) {
		payload.exp = this.getExpInMinutes(30);
		return this.jwt.sign(payload, {
			secret: this.config.get("JWT_REFRESH_SECRET")
		});
	}
	getExpInMinutes(mins: number) {
		return Math.trunc(Date.now() / 1000) + mins * 60;
	}
	async loginUser(){
		
	}
}
*/