import { config } from 'dotenv';
import { Deta } from 'deta';

declare module 'dotenv' {
	interface DotenvParseOutput {
		DETA_PROJECT_KEY: string;
	}
}

const deta = Deta(config().parsed?.DETA_PROJECT_KEY);

const UserBase = deta.Base('users');
const NotebookBase = deta.Base('notebooks');
const NoteBase = deta.Base('notes');
const SavedBase = deta.Base('saved');

export { UserBase, NoteBase, NotebookBase, SavedBase };
