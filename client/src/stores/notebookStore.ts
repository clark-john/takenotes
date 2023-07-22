import { AnyVariables, UseQueryArgs, useMutation, useQuery } from '@urql/vue';
import {
	AddNotebookDoc,
	GetNotebooksDoc,
	GetNotebookInfoDoc
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
	function getNotebookInfo(id: string) {
		return useQuery({
			query: GetNotebookInfoDoc,
			variables: { id }
		});
	}

	return { getNotebooks, addNotebook, getNotebookInfo };
});
