import gql from 'graphql-tag';
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
  title: Scalars['String']['input'];
};

export type AddNotebook = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  photoFilename?: InputMaybe<Scalars['String']['input']>;
};

export type Login = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote: Note;
  createNotebook: Notebook;
  deleteNote: Note;
  deleteNotebook: Notebook;
  login: AccessToken;
  register: AccessToken;
  updateNote: Scalars['String']['output'];
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


export type MutationUpdateNoteArgs = {
  note: UpdateNote;
};

export type Note = {
  __typename?: 'Note';
  backgroundColor: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  notebookId: Scalars['ID']['output'];
  title: Scalars['String']['output'];
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
  getNotebooks: Array<Notebook>;
  getNotes: Array<Note>;
  hello: Scalars['String']['output'];
  me?: Maybe<User>;
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
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AccessToken', accessToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, createdAt?: string | null } } };

export type GetNotebooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotebooksQuery = { __typename?: 'Query', getNotebooks: Array<{ __typename?: 'Notebook', id: string, name: string, userId: string, description: string, createdAt: any, backgroundColor?: string | null }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, createdAt?: string | null } | null };


export const LoginDoc = gql`
    mutation Login($username: String!, $password: String!) {
  login(login: {username: $username, password: $password}) {
    accessToken
    user {
      id
      firstName
      lastName
      username
      createdAt
    }
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
export const MeDoc = gql`
    query Me {
  me {
    id
    firstName
    lastName
    username
    createdAt
  }
}
    `;