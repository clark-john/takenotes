import {
	AnyVariables,
	UseMutationResponse,
	UseQueryArgs,
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
	UpdateNotebookMutationVariables
} from '@generated';
import { DocumentNode } from 'graphql';
import { defineStore } from 'pinia';

function pausedQuery(query: DocumentNode): UseQueryArgs<any, AnyVariables> {
	return {
		query,
		pause: true
	};
}

export const useNotebook = defineStore('notebook', () => {
	const { executeQuery: getNotebooks } = useQuery(pausedQuery(GetNotebooksDoc));
	const { executeMutation: addNotebook } = useMutation(AddNotebookDoc);
	function getNotebookInfo(
		id: string
	): UseQueryResponse<GetNotebookInfoQuery, GetNotebookInfoQueryVariables> {
		return useQuery({
			query: GetNotebookInfoDoc,
			variables: { id }
		});
	}
	const { executeMutation: deleteNotebook } = useMutation(DeleteNotebookDoc) as 
		UseMutationResponse<DeleteNotebookMutation, DeleteNotebookMutationVariables>;

	const { executeMutation: updateNotebook } = useMutation(UpdateNotebookDoc) as 
		UseMutationResponse<UpdateNotebookMutation, UpdateNotebookMutationVariables>

	return { getNotebooks, addNotebook, getNotebookInfo, deleteNotebook, updateNotebook };
});
