import {
	Field,
	GraphQLISODateTime,
	ID,
	InputType,
	ObjectType,
	PartialType
} from '@nestjs/graphql';
import { AddNote } from './note';

@ObjectType()
export class Notebook {
	@Field(() => ID)
	id: string;

	@Field(() => String)
	name: string;

	@Field(() => String)
	description: string;

	@Field(() => ID, { nullable: true })
	backgroundColor?: string;

	@Field(() => ID)
	userId: string;

	@Field(() => GraphQLISODateTime)
	createdAt: Date;
}

@InputType()
export class AddNotebook {
	@Field(() => String)
	name: string;

	@Field(() => String)
	description: string;

	// @Field(() => String, { nullable: true })
	// photoFilename?: string;
}

@InputType()
export class UpdateNotebook extends PartialType(AddNotebook) {
	@Field(() => ID)
	id: string;
}
