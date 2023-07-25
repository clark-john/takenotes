import { MeDoc, LogoutDoc, MeQuery, MeQueryVariables } from "@generated";
import { UseQueryResponse, useMutation, useQuery } from "@urql/vue";
import { defineStore } from "pinia";

export const useUser = defineStore('user', () => {
  const { executeQuery: getCurrent } = useQuery({ query: MeDoc }) as UseQueryResponse<MeQuery, MeQueryVariables>;
  const { executeMutation: logout } = useMutation(LogoutDoc);
  return { getCurrent, logout };
});
