import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { Request, Response } from 'express';
import { omit } from 'lodash';
import {
	AccessToken,
	Login,
	Register,
	User,
	UserWithPassword
} from './dto/user';
import { UserBase } from 'src/bases';
import { DetaObject } from 'src/types';
import { keyToId } from 'src/utils';
import { Cookies } from 'src/decorators';

@Resolver()
export class UserResolver {
	constructor(private jwt: JwtService, private config: ConfigService) {}

	/**
	 * Login a user
	*/
	@Mutation(() => AccessToken)
	async login(
		@Args('login') { username, password }: Login,
		@Context() ctx: any
	) {
		let user = (await UserBase.fetch({ username })).items.find(
			x => x.username === username
		) as UserWithPassword & DetaObject;

		if (!user) {
			throw new NotFoundException('User not found');
		} else if (!(await argon.verify(user.password, password))) {
			throw new BadRequestException('Wrong password');
		}

		const userReturn = keyToId(this.omitPassword(user));

		const payload = {
			username: user.username,
			sub: userReturn.id
		}

		const accessToken = this.getAccessToken(payload);
		const refreshToken = this.getRefreshToken(payload);

		this.sendRTCookie(ctx.res as Response, refreshToken);

		return {
			accessToken,
			user: keyToId(user)			
		}
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
		const args = register as Register & DetaObject;
		args.createdAt = new Date();
		args.actualPassword = args.password;
		args.password = await argon.hash(args.actualPassword);

		const items = await UserBase.fetch({ username: args.username });
		if (items.count !== 0) {
			throw new BadRequestException('Username exists');
		}
		const obj = await UserBase.put(args);
		const user = keyToId(this.omitPassword(obj));

		const payload = {
			username: args.username,
			sub: user.id
		}

		const accessToken = this.getAccessToken(payload);
		const refreshToken = this.getRefreshToken(payload);

		this.sendRTCookie(res, refreshToken);

		return {
			accessToken,
			user			
		}
	}

	@Mutation(() => String)
	async logout(@Cookies() cookies: { token: string }, @Context() ctx: { res: Response }){
		if (cookies.token) {
			ctx.res.clearCookie("token");
		}
		return "logged out";
	}

	/**
	 * get current user or otherwise unauthorized
	*/
	@Query(() => User)
	async me(@Context() ctx: { req: Request }) {
		return keyToId(this.omitPassword(await UserBase.get(ctx.req.user.sub)));
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
		payload.exp = this.getExpInMinutes(30);
		return this.jwt.sign(payload, {
			secret: this.config.get('JWT_ACCESS_SECRET')
		});
	}
	private getRefreshToken(payload: any) {
		payload.exp = this.getExpInMinutes(90);
		return this.jwt.sign(payload, {
			secret: this.config.get("JWT_REFRESH_SECRET")
		});
	}

	private getExpInMinutes(mins: number) {
		return Math.trunc(Date.now() / 1000) + 60 * mins;
	}

	private sendRTCookie(res: Response, token: string){
		res.cookie("token", token, {
			httpOnly: true,
			expires: new Date(this.getExpInMinutes(60) * 1000)
		});
	}

	/**
	 * simple hello world (excluded from auth)
	*/	
	@Query(() => String)
	hello(){
		return "Hello World";
	}
}
