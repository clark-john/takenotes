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

export type AddNote = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  notebookId: Scalars['ID']['input'];
};

export type AddNotebook = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Login = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBlankNote: Note;
  createNote: Note;
  createNotebook: Notebook;
  deleteNote: Note;
  deleteNotebook: Notebook;
  login: AccessToken;
  logout: Scalars['String']['output'];
  register: AccessToken;
  saveNote: Note;
  saveNotebook: Notebook;
  updateNote: Scalars['String']['output'];
  updateNotebook: Notebook;
};


export type MutationCreateBlankNoteArgs = {
  notebookId: Scalars['String']['input'];
};


export type MutationCreateNoteArgs = {
  note: AddNote;
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
  notebookId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
};

export type Notebook = {
  __typename?: 'Notebook';
  backgroundColor?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  getNote?: Maybe<Note>;
  getNotebookInfo?: Maybe<Notebook>;
  getNotebooks: Array<Notebook>;
  getNotes: Array<Note>;
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
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type NoteInfoFragment = { __typename?: 'Note', id: string, content: string, backgroundColor: string, notebookId: string, userId: string, createdAt: any };

export type SignedInFragment = { __typename?: 'AccessToken', accessToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, createdAt?: string | null } };

export type UserReturnFragment = { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, createdAt?: string | null };

export type AddBlankNoteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AddBlankNoteMutation = { __typename?: 'Mutation', createBlankNote: { __typename?: 'Note', id: string, content: string, backgroundColor: string, notebookId: string, userId: string, createdAt: any } };

export type AddNoteMutationVariables = Exact<{
  content: Scalars['String']['input'];
  notebookId: Scalars['ID']['input'];
}>;


export type AddNoteMutation = { __typename?: 'Mutation', createNote: { __typename?: 'Note', id: string, content: string, backgroundColor: string, notebookId: string, userId: string, createdAt: any } };

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


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AccessToken', accessToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, createdAt?: string | null } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AccessToken', accessToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, createdAt?: string | null } } };

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


export type GetNoteInfoQuery = { __typename?: 'Query', getNote?: { __typename?: 'Note', id: string, content: string, backgroundColor: string, notebookId: string, userId: string, createdAt: any } | null };

export type GetNotebookInfoQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetNotebookInfoQuery = { __typename?: 'Query', getNotebookInfo?: { __typename?: 'Notebook', name: string, description: string, userId: string } | null };

export type GetNotebooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotebooksQuery = { __typename?: 'Query', getNotebooks: Array<{ __typename?: 'Notebook', id: string, name: string, userId: string, description: string, createdAt: any, backgroundColor?: string | null }> };

export type GetNotesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetNotesQuery = { __typename?: 'Query', getNotes: Array<{ __typename?: 'Note', id: string, content: string, backgroundColor: string, notebookId: string, userId: string, createdAt: any }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, createdAt?: string | null } };

export const NoteInfo = gql`
    fragment NoteInfo on Note {
  id
  content
  backgroundColor
  notebookId
  userId
  createdAt
}
    `;
export const UserReturn = gql`
    fragment UserReturn on User {
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
    ...UserReturn
  }
}
    ${UserReturn}`;
export const AddBlankNoteDoc = gql`
    mutation AddBlankNote($id: String!) {
  createBlankNote(notebookId: $id) {
    ...NoteInfo
  }
}
    ${NoteInfo}`;
export const AddNoteDoc = gql`
    mutation AddNote($content: String!, $notebookId: ID!) {
  createNote(note: {content: $content, notebookId: $notebookId}) {
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
    id
    name
    userId
    description
    createdAt
    backgroundColor
  }
}
    `;
export const GetNotesDoc = gql`
    query GetNotes($id: String!) {
  getNotes(notebookId: $id) {
    ...NoteInfo
  }
}
    ${NoteInfo}`;
export const MeDoc = gql`
    query Me {
  me {
    ...UserReturn
  }
}
    ${UserReturn}`;