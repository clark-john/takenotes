import { Controller, Get, Post, Req, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { omit } from 'lodash';

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
	refreshToken(@Req() req: Request){
		const rtoken = req.cookies.token;
		if (!rtoken) {
			throw new UnauthorizedException("No refresh token");
		}
		try {
			const payload: Payload = this.jwt.verify(rtoken, { secret: this.config.get("JWT_REFRESH_SECRET") });
			return { accessToken: this.jwt.sign(omit(payload, ['iat', 'exp']), {
				secret: this.config.get("JWT_ACCESS_SECRET"),
				expiresIn: Math.trunc(Date.now() / 1000) + (60 * 10)
			})};
		} catch (e) {
			throw new UnauthorizedException("Refresh token invalid");
		}
	}
}
