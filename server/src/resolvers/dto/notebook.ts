import {
	Field,
	GraphQLISODateTime,
	ID,
	InputType,
	ObjectType
} from '@nestjs/graphql';

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

	@Field(() => String, { nullable: true })
	photoFilename?: string;
}
