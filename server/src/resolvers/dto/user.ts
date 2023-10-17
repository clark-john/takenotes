import {
	Field,
	InputType,
	ObjectType,
	ID,
	GraphQLISODateTime
} from '@nestjs/graphql';
import { IsDate, IsString, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import { BaseModel } from 'detantic';

@InputType()
export class Login {
	@Field()
	username: string;
	@Field()
	password: string;
}

@InputType()
export class Register {
	@Field()
	firstName: string;

	@Field({ nullable: true })
	lastName: string;

	@Field()
	username: string;

	@Field()
	@MinLength(8)
	password: string;

	@Field({ nullable: true })
	actualPassword?: string;

	@Field(() => GraphQLISODateTime, { nullable: true })
	createdAt: Date;
}

@ObjectType()
export class User extends BaseModel {
	@Field(() => ID)
	@IsString()
	id: string;

	@Field()
	firstName: string;

	@Field({ nullable: true })
	@IsString()
	lastName: string;

	@Field()
	@IsString()
	username: string;

	@Field(() => GraphQLISODateTime, { nullable: true })
	@IsDate()
	createdAt: Date;

	@Field()
	@IsString()
	@Exclude()
	@MinLength(8)
	password: string;

	/* @Field({ nullable: true })
	@IsString()
	@MinLength(8)
	@Exclude()
	actualPassword?: string; */
}

@ObjectType()
export class UserWithPassword extends User {
	@Field()
	password: string;

	@Field({ nullable: true })
	actualPassword: string;
}

@ObjectType()
export class AccessToken {
	@Field()
	accessToken: string;

	@Field(() => User)
	user: User;
}
