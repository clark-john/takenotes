import { useQuery } from '@urql/vue';
import { defineStore } from 'pinia';
import { GetNotesDoc } from '@generated';

export const useNote = defineStore('note', () => {
	function getNotes(id: string) {
		return useQuery({ query: GetNotesDoc, variables: { id } });
	}
	return { getNotes };
});
