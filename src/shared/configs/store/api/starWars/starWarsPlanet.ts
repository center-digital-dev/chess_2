import { baseApi } from "../../baseApi";

const planetsApi = baseApi.injectEndpoints({
   endpoints: (build) => {
      console.log("import Планет");
      return {
         getPlanet: build.query<void, void>({
            query() {
               return {
                  url: `planets/1`,
                  method: "GET"
               };
            }
         })
      };
   }
});

export const { useGetPlanetQuery } = planetsApi;
