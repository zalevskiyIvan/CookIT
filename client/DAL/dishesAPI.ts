import axios, { AxiosResponse } from "axios";
import { dishesType } from "../common/types";

const instanse = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3001/api/dishes",
});

export const dishesAPI = {
  publishDishes: (dishes: dishesType) => {
    debugger;
    return instanse.post("publish", dishes);
  },
  getDishes: (category: string): Promise<AxiosResponse<Array<dishesType>>> => {
    return instanse.get(`get-dishes?category=${category}`);
  },
};
