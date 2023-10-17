import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { omit } from 'lodash';
import {
	AccessToken,
	Login,
	Register,
	User
} from './dto/user';
import { Cookies } from 'src/decorators';
import { DetanticService } from 'src/services';
import { Model } from 'detantic';
import * as NodeRSA from 'node-rsa';
import { readFileSync } from 'fs';

const isDev = process.env.NODE_ENV === 'development';

@Resolver()
export class UserResolver {
	users: Model<User>;
	rsa: NodeRSA;

	constructor(
		private jwt: JwtService, 
		private config: ConfigService,
		private dt: DetanticService
	) {
		this.users = this.dt.createModel("users", new User);
		this.rsa = new NodeRSA(readFileSync("key.pem", "utf-8"));
	}

	/**
	 * Login a user
	 */
	@Mutation(() => AccessToken)
	async login(
		@Args('login') { username, password }: Login,
		@Context() ctx: any
	) {
		let user: User;
		try {
			user = await this.users.findOne({ username }) as User;
		} catch (e) {
			throw new NotFoundException('User not found');
		}

		user.createdAt = new Date(user.createdAt);
		
		if (this.rsa.decrypt(user.password, "utf8") !== password) {
			throw new BadRequestException('Wrong password');
		}

		const userReturn = this.omitPassword(user);

		const payload = {
			username: user.username,
			sub: userReturn.id
		};

		const accessToken = this.getAccessToken(payload);
		const refreshToken = this.getRefreshToken(payload);

		this.sendRTCookie(ctx.res as Response, refreshToken);

		return {
			accessToken,
			user
		};
	}

	/**
	 * Register a user
	 */
	@Mutation(() => AccessToken)
	async register(
		@Args('register') register: Register,
		@Context() ctx: any
	): Promise<AccessToken> {

		const res = ctx.res as Response;
		const args = register;
		args.createdAt = new Date();
		
		args.password = this.rsa.encrypt(args.password, "base64").toString()
		
		const items = await this.users.findMany({ username: args.username });

		if (items.length !== 0) {
			throw new BadRequestException('Username exists');
		}

		const obj = await this.users.insert(args);

		const user = this.omitPassword(obj) as User;

		user.createdAt = new Date(user.createdAt);

		const payload = {
			username: args.username,
			sub: user.id
		};

		const accessToken = this.getAccessToken(payload);
		const refreshToken = this.getRefreshToken(payload);

		this.sendRTCookie(res, refreshToken);

		return {
			accessToken,
			user
		};
	}

	@Mutation(() => String)
	async logout(
		@Cookies() cookies: { token: string },
		@Context() ctx: { res: Response }
	) {
		if (cookies.token) {
			ctx.res.clearCookie('token');
		}
		return 'logged out';
	}

	/**
	 * get current user or otherwise unauthorized
	 */
	@Query(() => User)
	async me(@Context() ctx: { req: Request }) {
		const data = await this.users.findOne({ key: ctx.req.user.sub  } as any);
		return this.omitPassword(data);
	}

	/**
	 * utility functions
	 */
	private omitPassword(
		obj: any
	): Omit<Record<string, any>, 'actualPassword' | 'password'> {
		return omit(obj, ['actualPassword', 'password']);
	}

	private getAccessToken(payload: any) {
		payload.exp = this.getExpInMinutes(isDev ? 180 : 60 * 24); // 1 day on prod, 3 hours on dev
		return this.jwt.sign(payload, {
			secret: this.config.get('JWT_ACCESS_SECRET')
		});
	}
	private getRefreshToken(payload: any) {
		payload.exp = this.getExpInMinutes(isDev ? 180 : 60 * 24 * 7 * 15); // 15 days
		return this.jwt.sign(payload, {
			secret: this.config.get('JWT_REFRESH_SECRET')
		});
	}

	private getExpInMinutes(mins: number) {
		return Math.trunc(Date.now() / 1000) + 60 * mins;
	}

	private sendRTCookie(res: Response, token: string) {
		res.cookie('token', token, {
			httpOnly: true,
			expires: new Date(this.getExpInMinutes(isDev ? 180 : 60 * 24 * 7 * 15) * 1000),
			secure: process.env.NODE_ENV !== 'development',
			sameSite: "none"
		});
	}

	/**
	 * simple hello world (excluded from auth)
	 */
	@Query(() => String)
	hello() {
		return 'Hello World';
	}
}
