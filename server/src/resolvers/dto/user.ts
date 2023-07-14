import {
	Field,
	InputType,
	ObjectType,
	ID,
	GraphQLISODateTime
} from '@nestjs/graphql';
import { MinLength } from 'class-validator';

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
	actualPassword: string;

	@Field(() => GraphQLISODateTime, { nullable: true })
	createdAt: Date;
}

@ObjectType()
export class User {
	@Field(() => ID)
	id: string;

	@Field()
	firstName: string;

	@Field({ nullable: true })
	lastName: string;

	@Field()
	username: string;

	@Field({ nullable: true })
	createdAt: string;
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
