import {
  AnyVariables,
	UseMutationResponse,
	UseQueryResponse,
	useMutation,
	useQuery
} from '@urql/vue';
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
	const { executeQuery: getNotebooks } = useQuery({
		query: GetNotebooksDoc
	}) as UseQueryResponse<GetNotebooksQuery, AnyVariables>;

	const { executeMutation: addNotebook } = useMutation(AddNotebookDoc);

	function getNotebookInfo(
		id: string
	): UseQueryResponse<GetNotebookInfoQuery, GetNotebookInfoQueryVariables> {
		return useQuery({
			query: GetNotebookInfoDoc,
			variables: { id }
		});
	}
	const { executeMutation: deleteNotebook } = useMutation(
		DeleteNotebookDoc
	) as UseMutationResponse<
		DeleteNotebookMutation,
		DeleteNotebookMutationVariables
	>;

	const { executeMutation: updateNotebook } = useMutation(
		UpdateNotebookDoc
	) as UseMutationResponse<
		UpdateNotebookMutation,
		UpdateNotebookMutationVariables
	>; 

	const { executeQuery: getPublicNotebooks } = useQuery({ query: GetPublicNotebooksDoc }) as UseQueryResponse<GetPublicNotebooksQuery, AnyVariables>;

	return {
		getNotebooks,
		addNotebook,
		getNotebookInfo,
		deleteNotebook,
		updateNotebook,
		getPublicNotebooks
	};
});
