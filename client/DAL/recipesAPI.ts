import axios, { AxiosResponse } from "axios";
import { commentType, recipeType } from "../common/types";

const instanse = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3001/api/recipes",
});

export const dishesAPI = {
  publishDishes: (dishes: recipeType) => {
    return instanse.post("publish", dishes).catch((error: any) => ({ error }));
  },
  getDishes: (
    category: string,
    userID?: string
  ): Promise<AxiosResponse<Array<recipeType>>> => {
    return instanse.get(`get-dishes?category=${category}&userID=${userID}`);
  },
  likePost: (postID: string) => {
    return instanse.post("like-post", { postID });
  },
  toBookmarks: (postID: string) => {
    return instanse
      .post("to-bookmarks", { postID })
      .catch((error: any) => ({ error }));
  },
  getBookmarks: (): Promise<AxiosResponse<{ bookmarks: recipeType[] }>> => {
    return instanse.get("get-bookmarks");
  },
  getRecipe: (recipeID: string): Promise<AxiosResponse<recipeType>> => {
    return instanse.get(`recipe?recipeID=${recipeID}`);
  },
  comment: (data: {
    postID: string;
    title: string;
  }): Promise<AxiosResponse<commentType>> => {
    return instanse.post(`comment`, data);
  },
  commentChild: (data: {
    parentID: string;
    title: string;
  }): Promise<AxiosResponse<commentType>> => {
    return instanse.post(`comment-child`, data);
  },
  getComments: (recipeID: string): Promise<AxiosResponse<commentType[]>> => {
    return instanse.get(`comments?recipeID=${recipeID}`);
  },
  getCommentChildren: (
    parentID: string
  ): Promise<AxiosResponse<commentType[]>> => {
    return instanse.get(`comment-children?parentID=${parentID}`);
  },
  getSubscriptions: (): Promise<AxiosResponse<recipeType[]>> => {
    return instanse.get(`get-subscriptions`);
  },
};
