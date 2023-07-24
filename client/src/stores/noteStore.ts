import {
	UseMutationResponse,
	UseQueryResponse,
	useMutation,
	useQuery
} from '@urql/vue';
import { defineStore } from 'pinia';
import {
	AddBlankNoteDoc,
	AddBlankNoteMutation,
	AddBlankNoteMutationVariables,
	GetNoteInfoDoc,
	GetNoteInfoQuery,
	GetNoteInfoQueryVariables,
	GetNotesDoc,
	GetNotesQuery,
	GetNotesQueryVariables,
	UpdateNoteDoc,
	UpdateNoteMutationVariables
} from '@generated';

export const useNote = defineStore('note', () => {
	/* getNotes */
	function getNotes(
		id: string
	): UseQueryResponse<GetNotesQuery, GetNotesQueryVariables> {
		return useQuery({ query: GetNotesDoc, variables: { id } });
	}
		
	/* createBlankNote */
	const { executeMutation: createBlankNote } = useMutation(
		AddBlankNoteDoc
	) as UseMutationResponse<AddBlankNoteMutation, AddBlankNoteMutationVariables>;
	
	/* getNoteInfo */
	function getNoteInfo(
		id: string
	): UseQueryResponse<GetNoteInfoQuery, GetNoteInfoQueryVariables> {
		return useQuery({ query: GetNoteInfoDoc, variables: { id } })
	}

	/* updateNote */
	const { executeMutation: updateNote } = useMutation(UpdateNoteDoc) as UseMutationResponse<any, Partial<UpdateNoteMutationVariables>>;

	return { getNotes, createBlankNote, getNoteInfo, updateNote };
});
