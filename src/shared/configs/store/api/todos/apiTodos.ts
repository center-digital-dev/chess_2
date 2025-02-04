import { baseApi } from "../../baseApi";

const apiTodos = baseApi.injectEndpoints({
   endpoints: (build) => {
      return {
         getTodos: build.query<{ text: string }[], void>({
            query(body) {
               return {
                  url: "todos",
                  method: "GET",
                  body
               };
            }
         })
      };
   }
});

export const { useGetTodosQuery } = apiTodos;
