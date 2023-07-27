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
import {
	AnyVariables,
	UseMutationResponse,
	UseQueryResponse,
	useMutation,
	useQuery
} from '@urql/vue';
import { defineStore } from 'pinia';

export const useSaved = defineStore('saved', () => {
	const { executeQuery: getSavedNotes } = useQuery({
		query: GetSavedNotesDoc
	}) as UseQueryResponse<GetSavedNotesQuery, AnyVariables>;
	const { executeQuery: getSavedNotebooks } = useQuery({
		query: GetSavedNotebooksDoc
	}) as UseQueryResponse<GetSavedNotebooksQuery, AnyVariables>;

	/* save notebook */
	const { executeMutation: saveNotebook } = useMutation(
		SaveNotebookDoc
	) as UseMutationResponse<SaveNotebookMutation, SaveNotebookMutationVariables>;

	/* save note */
	const { executeMutation: saveNote } = useMutation(
		SaveNoteDoc
	) as UseMutationResponse<SaveNoteMutation, SaveNoteMutationVariables>;

	/* unsave note */
	const { executeMutation: unsaveNote } = useMutation(
		UnsaveNoteDoc
	) as UseMutationResponse<UnsaveNoteMutation, UnsaveNoteMutationVariables>;

	/* unsave notebook */
	const { executeMutation: unsaveNotebook } = useMutation(
		UnsaveNotebookDoc
	) as UseMutationResponse<
		UnsaveNotebookMutation,
		UnsaveNotebookMutationVariables
	>;

	return {
		saveNotebook,
		saveNote,
		unsaveNote,
		unsaveNotebook,
		getSavedNotebooks,
		getSavedNotes
	};
});
