import { baseApi } from "../../baseApi";

const peopleApi = baseApi.injectEndpoints({
   endpoints: (build) => {
      console.log("import People");
      return {
         getPeople: build.query<void, void>({
            query() {
               return {
                  url: `people/1`,
                  method: "GET"
               };
            }
         })
      };
   }
});

export const { useGetPeopleQuery } = peopleApi;
