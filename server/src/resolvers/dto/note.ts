import { Field, GraphQLISODateTime, ID, InputType, ObjectType, OmitType, PartialType } from '@nestjs/graphql';

@ObjectType()
export class Note {
	@Field(() => ID)
	id: string;

	@Field(() => String)
	title: string;

	@Field(() => String)
	content: string;

	@Field(() => String)
	backgroundColor: string;

	@Field(() => ID)
	notebookId: string;

	@Field(() => ID)
	userId: string;

	@Field(() => GraphQLISODateTime)
	createdAt: Date;
}

@InputType()
export class AddNote {
	@Field(() => String)
	title: string;

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
