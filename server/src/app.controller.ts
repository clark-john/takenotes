import { Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
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
	constructor(private jwt: JwtService, private config: ConfigService) {}

	@Get()
	getHello(): string {
		return 'Hello World';
	}

	@Post('refresh')
	refreshToken(@Cookies() cookies: { token: string }) {
		const rtoken = cookies.token;
		if (!rtoken) {
			throw new UnauthorizedException('No refresh token');
		}
		try {
			const payload: Payload = this.jwt.verify(rtoken, {
				secret: this.config.get('JWT_REFRESH_SECRET')
			});
			return {
				accessToken: this.jwt.sign(omit(payload, ['iat', 'exp']), {
					secret: this.config.get('JWT_ACCESS_SECRET'),
					expiresIn: 3600
				})
			};
		} catch (e) {
			throw new UnauthorizedException('Expired token');
		}
	}
}
