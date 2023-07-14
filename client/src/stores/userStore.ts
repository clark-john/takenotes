import { gql, useQuery } from "@urql/vue";
import { defineStore } from "pinia";

// setup store
export const userStore = defineStore("user", () => {
	function hasUser() {
		return useQuery({
			query: gql`
				{
					me {
						id
						username
						createdAt
					}
				}
			`
		})
	}
	return { hasUser };
});
