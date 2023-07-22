import { Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'lodash';
import { Cookies } from './decorators';

interface Payload {
	username: string;
	sub: string;
	iat: number;
	exp?: number;
}

@Controller()
export class AppController {
	constructor(
		private jwt: JwtService,
		private config: ConfigService
	){}

	@Get()
	getHello(): string {
		return 'Hello World';
	}

	@Post("refresh")
	refreshToken(@Cookies() cookies: { token: string }){
		const rtoken = cookies.token;
		if (!rtoken) {
			return {
				accessToken: ''
			}
		}
		try {
			const payload: Payload = this.jwt.verify(rtoken, { secret: this.config.get("JWT_REFRESH_SECRET") });
			return { accessToken: this.jwt.sign(omit(payload, ['iat', 'exp']), {
				secret: this.config.get("JWT_ACCESS_SECRET"),
				expiresIn: Math.trunc(Date.now() / 1000) + (60 * 10)
			})};
		} catch (e) {
			return {
				accessToken: ''
			}
		}
	}
}
