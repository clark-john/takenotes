import {
	AnyVariables,
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
	GetNotebookInfoQueryVariables
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

	return { getNotebooks, addNotebook, getNotebookInfo };
});
