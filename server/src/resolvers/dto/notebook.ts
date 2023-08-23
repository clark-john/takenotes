import {
	Field,
	GraphQLISODateTime,
	ID,
	InputType,
	ObjectType,
	PartialType
} from '@nestjs/graphql';
import { IsArray, IsBoolean, IsDate, IsHexColor, IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseModel } from 'detantic';

@ObjectType()
export class Notebook extends BaseModel {
	@IsString()
	@IsUUID(4)
	@Field(() => ID)
	id: string;

	@IsString()
	@Field(() => String)
	name: string;

	@IsString()
	@Field(() => String)
	description: string;

	@IsString()
	@IsOptional()
	@IsHexColor()
	@Field(() => ID, { nullable: true })
	backgroundColor?: string;

	@IsString()
	@Field(() => ID)
	userId: string;

	@IsBoolean()
	@Field(() => Boolean, {nullable: true })
	saved?: boolean;

	@IsArray()
	@Field(() => [String])
	savedBy: string[];

	@IsBoolean()
	@Field(() => Boolean)
	isPublic: boolean;

	@IsDate()
	@Field(() => GraphQLISODateTime)
	createdAt: Date;
}

@InputType()
export class AddNotebook {
	@Field(() => String)
	name: string;

	@Field(() => String)
	description: string;

	@Field(() => Boolean, { defaultValue: true })
	isPublic: boolean;

	// @Field(() => String, { nullable: true })
	// photoFilename?: string;
}

@InputType()
export class UpdateNotebook extends PartialType(AddNotebook) {
	@Field(() => ID)
	id: string;
}
