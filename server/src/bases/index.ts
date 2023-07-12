import { config } from 'dotenv';
import { Base, Deta } from 'deta';

declare module 'dotenv' {
	interface DotenvParseOutput {
		DETA_PROJECT_KEY: string;
	}
}

type DetaBase = ReturnType<typeof Base>;

const deta = Deta(config().parsed?.DETA_PROJECT_KEY);

const UserBase: DetaBase = deta.Base('users');
const NotebookBase: DetaBase = deta.Base('notebooks');
const NoteBase: DetaBase = deta.Base('notes');

export { UserBase, NoteBase, NotebookBase };
