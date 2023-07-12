import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { Request } from 'express';
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

@Resolver()
export class UserResolver {
	constructor(private jwt: JwtService, private config: ConfigService) {}

	@Mutation(() => AccessToken)
	async login(
		@Args('login') { username, password }: Login
	): Promise<AccessToken> {
		let user = (await UserBase.fetch({ username })).items.find(
			x => x.username === username
		) as UserWithPassword & DetaObject;

		if (!user) {
			throw new NotFoundException('User not found');
		} else if (!(await argon.verify(user.password, password))) {
			throw new BadRequestException('Wrong password');
		}

		const userReturn = keyToId(this.omitPassword(user));

		const accessToken = this.getAccessToken({
			username: user.username,
			sub: userReturn.id
		});

		const refreshToken = this.getRefreshToken({
			username: user.username
		});

		return {
			accessToken,
			user: userReturn,
			refreshToken
		};
	}

	@Mutation(() => AccessToken)
	async register(@Args('register') register: Register): Promise<AccessToken> {
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

		const accessToken = this.getAccessToken({
			username: args.username,
			sub: user.id
		});

		const refreshToken = this.getRefreshToken({
			username: args.username
		});

		return {
			accessToken,
			user,
			refreshToken
		};
	}

	@Query(() => User)
	async me(@Context() ctx: { req: Request }) {
		return keyToId(this.omitPassword(await UserBase.get(ctx.req.user.sub)));
	}

	private omitPassword(
		obj: any
	): Omit<Record<string, any>, 'actualPassword' | 'password'> {
		return omit(obj, ['actualPassword', 'password']);
	}
	private getAccessToken(payload: any) {
		payload.exp = this.getExpInMinutes(60);
		return this.jwt.sign(payload, {
			secret: this.config.get('JWT_ACCESS_SECRET')
		});
	}
	private getRefreshToken(payload: any) {
		/*payload.exp = this.getExpInMinutes(20);
		return this.jwt.sign(payload, {
			secret: this.config.get("JWT_REFRESH_SECRET")
		});*/
		return 'sdffsds';
	}
	private getExpInMinutes(mins: number) {
		return Math.trunc(Date.now() / 1000) + mins * 60;
	}
}
