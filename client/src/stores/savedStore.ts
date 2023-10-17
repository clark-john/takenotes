import {
	GetSavedNotebooksDoc,
	GetSavedNotebooksQuery,
	GetSavedNotesDoc,
	GetSavedNotesQuery,
	SaveNoteDoc,
	SaveNoteMutation,
	SaveNoteMutationVariables,
	SaveNotebookDoc,
	SaveNotebookMutation,
	SaveNotebookMutationVariables,
	UnsaveNoteDoc,
	UnsaveNoteMutation,
	UnsaveNoteMutationVariables,
	UnsaveNotebookDoc,
	UnsaveNotebookMutation,
	UnsaveNotebookMutationVariables
} from '@generated';
import { AnyVariables, useMutation, useQuery } from '@urql/vue';
import { defineStore } from 'pinia';

export const useSaved = defineStore('saved', () => {
	const { executeQuery: getSavedNotes } = useQuery<GetSavedNotesQuery, AnyVariables>({
		query: GetSavedNotesDoc
	});
	const { executeQuery: getSavedNotebooks } = useQuery<GetSavedNotebooksQuery, AnyVariables>({
		query: GetSavedNotebooksDoc
	});

	/* save notebook */
	const { executeMutation: saveNotebook } = useMutation<SaveNotebookMutation, SaveNotebookMutationVariables>(
		SaveNotebookDoc
	);

	/* save note */
	const { executeMutation: saveNote } = useMutation<SaveNoteMutation, SaveNoteMutationVariables>(
		SaveNoteDoc
	);

	/* unsave note */
	const { executeMutation: unsaveNote } = useMutation<UnsaveNoteMutation, UnsaveNoteMutationVariables>(
		UnsaveNoteDoc
	);

	/* unsave notebook */
	const { executeMutation: unsaveNotebook } = useMutation<
		UnsaveNotebookMutation,
		UnsaveNotebookMutationVariables
	>(
		UnsaveNotebookDoc
	);

	return {
		saveNotebook,
		saveNote,
		unsaveNote,
		unsaveNotebook,
		getSavedNotebooks,
		getSavedNotes
	};
});
