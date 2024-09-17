import { AnyVariables, useMutation, useQuery } from '@urql/vue';
import {
	AddNotebookDoc,
	GetNotebooksDoc,
	GetNotebookInfoDoc,
	GetNotebookInfoQuery,
	GetNotebookInfoQueryVariables,
	DeleteNotebookDoc,
	UpdateNotebookDoc,
	DeleteNotebookMutation,
	DeleteNotebookMutationVariables,
	UpdateNotebookMutation,
	UpdateNotebookMutationVariables,
	GetNotebooksQuery,
	GetPublicNotebooksDoc,
	GetPublicNotebooksQuery
} from '@generated';
import { defineStore } from 'pinia';

export const useNotebook = defineStore('notebook', () => {
	const { executeQuery: getNotebooks } = useQuery<
		GetNotebooksQuery,
		AnyVariables
	>({
		query: GetNotebooksDoc
	});

	const { executeMutation: addNotebook } = useMutation(AddNotebookDoc);

	function getNotebookInfo(id: string) {
		return useQuery<GetNotebookInfoQuery, GetNotebookInfoQueryVariables>({
			query: GetNotebookInfoDoc,
			variables: { id }
		});
	}
	const { executeMutation: deleteNotebook } = useMutation<
		DeleteNotebookMutation,
		DeleteNotebookMutationVariables
	>(DeleteNotebookDoc);

	const { executeMutation: updateNotebook } = useMutation<
		UpdateNotebookMutation,
		UpdateNotebookMutationVariables
	>(UpdateNotebookDoc);

	const { executeQuery: getPublicNotebooks } = useQuery<
		GetPublicNotebooksQuery,
		AnyVariables
	>({ query: GetPublicNotebooksDoc });

	return {
		getNotebooks,
		addNotebook,
		getNotebookInfo,
		deleteNotebook,
		updateNotebook,
		getPublicNotebooks
	};
});
