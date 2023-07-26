import { IsIn, IsString, IsUUID } from 'class-validator';

export class Saved {
	@IsString()
	key: string;

	@IsIn(['note', 'notebook'])
	type: 'note' | 'notebook';

	@IsUUID(4)
	@IsString()
	userId: string;

	@IsUUID(4)
	@IsString()
	objectId: string;
}
