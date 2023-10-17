import { useMutation, useQuery } from '@urql/vue';
import { defineStore } from 'pinia';
import {
	AddBlankNoteDoc,
	AddBlankNoteMutation,
	AddBlankNoteMutationVariables,
	DeleteNoteDoc,
	DeleteNoteMutation,
	DeleteNoteMutationVariables,
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
	) {
		return useQuery<GetNotesQuery, GetNotesQueryVariables>(
			{ query: GetNotesDoc, variables: { id } }
		);
	}

	/* createBlankNote */
	const { executeMutation: createBlankNote } = useMutation<AddBlankNoteMutation, AddBlankNoteMutationVariables>(
		AddBlankNoteDoc
	);

	/* getNoteInfo */
	function getNoteInfo(
		id: string
	) {
		return useQuery<GetNoteInfoQuery, GetNoteInfoQueryVariables>(
			{ query: GetNoteInfoDoc, variables: { id } }
		);
	}

	/* updateNote */
	const { executeMutation: updateNote } = useMutation<any, Partial<UpdateNoteMutationVariables>>(
		UpdateNoteDoc
	);

	/* deleteNote */
	const { executeMutation: deleteNote } = useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(
		DeleteNoteDoc
	);

	return { getNotes, createBlankNote, getNoteInfo, updateNote, deleteNote };
});
