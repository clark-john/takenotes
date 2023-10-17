import { MeDoc, LogoutDoc, MeQuery, MeQueryVariables } from '@generated';
import { useMutation, useQuery } from '@urql/vue';
import { defineStore } from 'pinia';

export const useUser = defineStore('user', () => {
	const { executeQuery: getCurrent } = useQuery<
		MeQuery, 
		MeQueryVariables
	>({
		query: MeDoc
	});
	const { executeMutation: logout } = useMutation(LogoutDoc);
	return { getCurrent, logout };
});
