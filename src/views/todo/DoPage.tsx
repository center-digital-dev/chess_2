"use client";
import { useGetPlanetQuery } from "@shared/configs/store/api/starWars/starWarsPlanet";

export const ToDoPage = () => {
   const { data } = useGetPlanetQuery();
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
   // @ts-ignore
   return <h2>Планета {data?.name && data.name}</h2>;
};
