import { gql } from '@urql/vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken: Scalars['String']['output'];
  user: User;
};

export type AddNotebook = {
  description: Scalars['String']['input'];
  isPublic?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type Login = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBlankNote: Note;
  createNotebook: Notebook;
  deleteNote: Note;
  deleteNotebook: Notebook;
  login: AccessToken;
  logout: Scalars['String']['output'];
  register: AccessToken;
  saveNote: Note;
  saveNotebook: Notebook;
  unsaveNote: Note;
  unsaveNotebook: Notebook;
  updateNote: Scalars['String']['output'];
  updateNotebook: Notebook;
};


export type MutationCreateBlankNoteArgs = {
  notebookId: Scalars['String']['input'];
};


export type MutationCreateNotebookArgs = {
  notebook: AddNotebook;
};


export type MutationDeleteNoteArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteNotebookArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  login: Login;
};


export type MutationRegisterArgs = {
  register: Register;
};


export type MutationSaveNoteArgs = {
  id: Scalars['String']['input'];
};


export type MutationSaveNotebookArgs = {
  id: Scalars['String']['input'];
};


export type MutationUnsaveNoteArgs = {
  id: Scalars['String']['input'];
};


export type MutationUnsaveNotebookArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateNoteArgs = {
  note: UpdateNote;
};


export type MutationUpdateNotebookArgs = {
  notebook: UpdateNotebook;
};

export type Note = {
  __typename?: 'Note';
  backgroundColor: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isPublic: Scalars['Boolean']['output'];
  notebookId: Scalars['ID']['output'];
  saved: Scalars['Boolean']['output'];
  savedBy: Array<Scalars['String']['output']>;
  userId: Scalars['ID']['output'];
};

export type Notebook = {
  __typename?: 'Notebook';
  backgroundColor?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isPublic: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  saved?: Maybe<Scalars['Boolean']['output']>;
  savedBy: Array<Scalars['String']['output']>;
  userId: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  getNote?: Maybe<Note>;
  getNotebookInfo?: Maybe<Notebook>;
  getNotebooks: Array<Notebook>;
  getNotes: Array<Note>;
  getPublicNotebooks: Array<Notebook>;
  getSavedNotebooks: Array<Notebook>;
  getSavedNotes: Array<Note>;
  hello: Scalars['String']['output'];
  me: User;
};


export type QueryGetNoteArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetNotebookInfoArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetNotesArgs = {
  notebookId: Scalars['String']['input'];
};


export type QueryGetPublicNotebooksArgs = {
  limit?: Scalars['Float']['input'];
};

export type Register = {
  actualPassword?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UpdateNote = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateNotebook = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  actualPassword?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type NoteInfoFragment = { __typename?: 'Note', id: string, content: string, backgroundColor: string, notebookId: string, userId: string, saved: boolean, savedBy: Array<string>, createdAt: any, isPublic: boolean };

export type RegularNotebookFragment = { __typename?: 'Notebook', id: string, name: string, userId: string, description: string, createdAt: any, saved?: boolean | null, savedBy: Array<string>, backgroundColor?: string | null, isPublic: boolean };

export type SignedInFragment = { __typename?: 'AccessToken', accessToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, createdAt?: any | null } };

export type RegularUserFragment = { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, createdAt?: any | null };

export type AddBlankNoteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AddBlankNoteMutation = { __typename?: 'Mutation', createBlankNote: { __typename?: 'Note', id: string, content: string, backgroundColor: string, notebookId: string, userId: string, saved: boolean, savedBy: Array<string>, createdAt: any, isPublic: boolean } };

export type AddNotebookMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
}>;


export type AddNotebookMutation = { __typename?: 'Mutation', createNotebook: { __typename?: 'Notebook', id: string, name: string, description: string, createdAt: any, backgroundColor?: string | null, userId: string } };

export type DeleteNoteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteNoteMutation = { __typename?: 'Mutation', deleteNote: { __typename?: 'Note', id: string } };

export type DeleteNotebookMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteNotebookMutation = { __typename?: 'Mutation', deleteNotebook: { __typename?: 'Notebook', id: string, name: string } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AccessToken', accessToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, createdAt?: any | null } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AccessToken', accessToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, createdAt?: any | null } } };

export type SaveNoteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SaveNoteMutation = { __typename?: 'Mutation', saveNote: { __typename?: 'Note', id: string } };

export type SaveNotebookMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SaveNotebookMutation = { __typename?: 'Mutation', saveNotebook: { __typename?: 'Notebook', id: string, name: string } };

export type UnsaveNoteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type UnsaveNoteMutation = { __typename?: 'Mutation', unsaveNote: { __typename?: 'Note', id: string } };

export type UnsaveNotebookMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type UnsaveNotebookMutation = { __typename?: 'Mutation', unsaveNotebook: { __typename?: 'Notebook', id: string, name: string } };

export type UpdateNoteMutationVariables = Exact<{
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateNoteMutation = { __typename?: 'Mutation', updateNote: string };

export type UpdateNotebookMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateNotebookMutation = { __typename?: 'Mutation', updateNotebook: { __typename?: 'Notebook', id: string, name: string, description: string } };

export type GetNoteInfoQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetNoteInfoQuery = { __typename?: 'Query', getNote?: { __typename?: 'Note', id: string, content: string, backgroundColor: string, notebookId: string, userId: string, saved: boolean, savedBy: Array<string>, createdAt: any, isPublic: boolean } | null };

export type GetNotebookInfoQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetNotebookInfoQuery = { __typename?: 'Query', getNotebookInfo?: { __typename?: 'Notebook', name: string, description: string, userId: string } | null };

export type GetNotebooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotebooksQuery = { __typename?: 'Query', getNotebooks: Array<{ __typename?: 'Notebook', id: string, name: string, userId: string, description: string, createdAt: any, saved?: boolean | null, savedBy: Array<string>, backgroundColor?: string | null, isPublic: boolean }> };

export type GetNotesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetNotesQuery = { __typename?: 'Query', getNotes: Array<{ __typename?: 'Note', id: string, content: string, backgroundColor: string, notebookId: string, userId: string, saved: boolean, savedBy: Array<string>, createdAt: any, isPublic: boolean }> };

export type GetPublicNotebooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublicNotebooksQuery = { __typename?: 'Query', getPublicNotebooks: Array<{ __typename?: 'Notebook', id: string, name: string, userId: string, description: string, createdAt: any, saved?: boolean | null, savedBy: Array<string>, backgroundColor?: string | null, isPublic: boolean }> };

export type GetSavedNotebooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSavedNotebooksQuery = { __typename?: 'Query', getSavedNotebooks: Array<{ __typename?: 'Notebook', id: string, name: string, userId: string, description: string, createdAt: any, saved?: boolean | null, savedBy: Array<string>, backgroundColor?: string | null, isPublic: boolean }> };

export type GetSavedNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSavedNotesQuery = { __typename?: 'Query', getSavedNotes: Array<{ __typename?: 'Note', id: string, content: string, backgroundColor: string, notebookId: string, userId: string, saved: boolean, savedBy: Array<string>, createdAt: any, isPublic: boolean }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, createdAt?: any | null } };

export const NoteInfo = gql`
    fragment NoteInfo on Note {
  id
  content
  backgroundColor
  notebookId
  userId
  saved
  savedBy
  createdAt
  isPublic
}
    `;
export const RegularNotebook = gql`
    fragment RegularNotebook on Notebook {
  id
  name
  userId
  description
  createdAt
  saved
  savedBy
  backgroundColor
  isPublic
}
    `;
export const RegularUser = gql`
    fragment RegularUser on User {
  id
  firstName
  lastName
  username
  createdAt
}
    `;
export const SignedIn = gql`
    fragment SignedIn on AccessToken {
  accessToken
  user {
    ...RegularUser
  }
}
    ${RegularUser}`;
export const AddBlankNoteDoc = gql`
    mutation AddBlankNote($id: String!) {
  createBlankNote(notebookId: $id) {
    ...NoteInfo
  }
}
    ${NoteInfo}`;
export const AddNotebookDoc = gql`
    mutation AddNotebook($name: String!, $description: String!) {
  createNotebook(notebook: {name: $name, description: $description}) {
    id
    name
    description
    createdAt
    backgroundColor
    userId
  }
}
    `;
export const DeleteNoteDoc = gql`
    mutation DeleteNote($id: String!) {
  deleteNote(id: $id) {
    id
  }
}
    `;
export const DeleteNotebookDoc = gql`
    mutation DeleteNotebook($id: String!) {
  deleteNotebook(id: $id) {
    id
    name
  }
}
    `;
export const LoginDoc = gql`
    mutation Login($username: String!, $password: String!) {
  login(login: {username: $username, password: $password}) {
    ...SignedIn
  }
}
    ${SignedIn}`;
export const LogoutDoc = gql`
    mutation Logout {
  logout
}
    `;
export const RegisterDoc = gql`
    mutation Register($firstName: String!, $lastName: String, $username: String!, $password: String!) {
  register(
    register: {firstName: $firstName, lastName: $lastName, username: $username, password: $password}
  ) {
    ...SignedIn
  }
}
    ${SignedIn}`;
export const SaveNoteDoc = gql`
    mutation SaveNote($id: String!) {
  saveNote(id: $id) {
    id
  }
}
    `;
export const SaveNotebookDoc = gql`
    mutation SaveNotebook($id: String!) {
  saveNotebook(id: $id) {
    id
    name
  }
}
    `;
export const UnsaveNoteDoc = gql`
    mutation UnsaveNote($id: String!) {
  unsaveNote(id: $id) {
    id
  }
}
    `;
export const UnsaveNotebookDoc = gql`
    mutation UnsaveNotebook($id: String!) {
  unsaveNotebook(id: $id) {
    id
    name
  }
}
    `;
export const UpdateNoteDoc = gql`
    mutation UpdateNote($content: String, $id: ID!, $backgroundColor: String) {
  updateNote(
    note: {content: $content, backgroundColor: $backgroundColor, id: $id}
  )
}
    `;
export const UpdateNotebookDoc = gql`
    mutation UpdateNotebook($id: ID!, $name: String, $description: String) {
  updateNotebook(notebook: {id: $id, name: $name, description: $description}) {
    id
    name
    description
  }
}
    `;
export const GetNoteInfoDoc = gql`
    query GetNoteInfo($id: String!) {
  getNote(id: $id) {
    ...NoteInfo
  }
}
    ${NoteInfo}`;
export const GetNotebookInfoDoc = gql`
    query GetNotebookInfo($id: String!) {
  getNotebookInfo(id: $id) {
    name
    description
    userId
  }
}
    `;
export const GetNotebooksDoc = gql`
    query GetNotebooks {
  getNotebooks {
    ...RegularNotebook
  }
}
    ${RegularNotebook}`;
export const GetNotesDoc = gql`
    query GetNotes($id: String!) {
  getNotes(notebookId: $id) {
    ...NoteInfo
  }
}
    ${NoteInfo}`;
export const GetPublicNotebooksDoc = gql`
    query GetPublicNotebooks {
  getPublicNotebooks {
    ...RegularNotebook
  }
}
    ${RegularNotebook}`;
export const GetSavedNotebooksDoc = gql`
    query GetSavedNotebooks {
  getSavedNotebooks {
    ...RegularNotebook
  }
}
    ${RegularNotebook}`;
export const GetSavedNotesDoc = gql`
    query GetSavedNotes {
  getSavedNotes {
    ...NoteInfo
  }
}
    ${NoteInfo}`;
export const MeDoc = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUser}`;