import { useQuery } from "@urql/vue";
import { GetNotebooksDoc } from "@generated";
import { defineStore } from "pinia";

export const useNotebook = defineStore('notebook', () => {
  const { executeQuery: getNotebooks } = useQuery({
    query: GetNotebooksDoc,
    pause: true
  });
  return { getNotebooks };
});
