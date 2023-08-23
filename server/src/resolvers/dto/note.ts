import {
	Field,
	GraphQLISODateTime,
	ID,
	InputType,
	ObjectType,
	OmitType,
	PartialType
} from '@nestjs/graphql';
import { IsArray, IsBoolean, IsDate, IsHexColor, IsString, IsUUID } from 'class-validator';
import { BaseModel } from 'detantic';

@ObjectType()
export class Note extends BaseModel {
	@Field(() => ID)
	@IsString()
	@IsUUID(4)
	id: string;

	@Field(() => String)
	@IsString()
	content: string;

	@Field(() => String)
	@IsString()
	@IsHexColor()
	backgroundColor: string;

	@Field(() => ID)
	@IsString()
	@IsUUID(4)
	notebookId: string;

	@Field(() => ID)
	@IsString()
	userId: string;

	@Field(() => Boolean)
	@IsBoolean()
	saved: boolean;

	@Field(() => [String])
	@IsArray()
	savedBy: string[];

	@Field(() => Boolean)
	@IsBoolean()
	isPublic: boolean;

	@Field(() => GraphQLISODateTime)
	@IsDate()
	createdAt: Date;
}

@InputType()
export class AddNote {
	@Field(() => String)
	content: string;

	@Field(() => ID)
	notebookId: string;

	@Field(() => String, { nullable: true })
	backgroundColor: string;
}

@InputType()
export class UpdateNote extends PartialType(OmitType(AddNote, ['notebookId'])) {
	@Field(() => ID)
	id: string;
}
