import { Dispatch } from "react";
import {
  ActionTypes,
  commentType,
  recipeType,
  stepType,
} from "../../common/types";
import { dishesAPI } from "../../DAL/recipesAPI";

const initialState = {
  dish: {} as recipeType,
  recipe: [] as Array<stepType>,
  actuallDishes: [] as Array<recipeType>,
  actuallRecipe: {} as recipeType,
  actuallComments: [] as commentType[],
  commentChilds: [] as commentType[],
  isError: false,
};
type stateType = typeof initialState;

export const dishesReducer = (
  state = initialState,
  action: actionType
): stateType => {
  switch (action.type) {
    case "SET_STEP":
      return {
        ...state,
        recipe: [...state.recipe, action.step],
      };
    case "SET_DISH":
      return {
        ...state,
        dish: action.dish,
      };
    case "GET_DISHES":
      return {
        ...state,
        actuallDishes: action.dishes,
      };
    case "LIKE_POST":
      return {
        ...state,
        ...state.actuallDishes.map(
          (i) => i._id === action.postID && i.likesCount++
        ),
      };
    case "GET_RECIPE":
      return {
        ...state,
        actuallRecipe: action.recipe,
      };
    case "SET_COMMENTS":
      return {
        ...state,
        actuallComments: action.comments,
      };
    case "ADD_COMMENT":
      return {
        ...state,
        actuallComments: [action.comment, ...state.actuallComments],
      };
    case "SET_COMMENTS_CHILDS":
      return {
        ...state,
        commentChilds: action.childs,
      };
    default:
      return state;
  }
};
type actionType = ActionTypes<typeof actions>;

export const actions = {
  setrecipestep: (step: stepType) => ({ type: "SET_STEP", step } as const),
  setDish: (dish: recipeType) => ({ type: "SET_DISH", dish } as const),
  getDishes: (dishes: Array<recipeType>) =>
    ({
      type: "GET_DISHES",
      dishes,
    } as const),
  likePost: (postID: string) => ({ type: "LIKE_POST", postID } as const),
  getRecipe: (recipe: recipeType) =>
    ({
      type: "GET_RECIPE",
      recipe,
    } as const),
  setComments: (comments: commentType[]) =>
    ({ type: "SET_COMMENTS", comments } as const),
  addComments: (comment: commentType) =>
    ({ type: "ADD_COMMENT", comment } as const),
  setCommentChilds: (childs: commentType[]) =>
    ({ type: "SET_COMMENTS_CHILDS", childs } as const),
};

export const publishT = (dish: recipeType, recipe: Array<stepType>) => {
  return async (dispatch: Dispatch<actionType>) => {
    dish.recipe = recipe;
    await dishesAPI.publishDishes(dish);
  };
};

export const getDishesT = (category: string, userID?: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await dishesAPI.getDishes(category, userID);
    dispatch(actions.getDishes(res.data));
  };
};
export const likePostT = (postID: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await dishesAPI.likePost(postID);
    dispatch(actions.likePost(postID));
  };
};
export const addToBookmarksT = (postID: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    await dishesAPI.toBookmarks(postID);
  };
};
export const getBookmarksT = () => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await dishesAPI.getBookmarks();
    dispatch(actions.getDishes(res.data.bookmarks));
  };
};
export const getRecipeT = (recipeID: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await dishesAPI.getRecipe(recipeID);
    dispatch(actions.getRecipe(res.data));
  };
};

export const commentT = (postID: string, title: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const data = { postID, title };
    const res = await dishesAPI.comment(data);
    dispatch(actions.addComments(res.data));
  };
};
export const commentChildT = (parentID: string, title: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const data = { parentID, title };
    const res = await dishesAPI.commentChild(data);
    // dispatch(actions.addComments(res.data));
  };
};
export const getCommentsT = (recipeID: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await dishesAPI.getComments(recipeID);
    dispatch(actions.setComments(res.data));
  };
};

export const getCommentChildrenT = (parentID: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await dishesAPI.getCommentChildren(parentID);
    dispatch(actions.setCommentChilds(res.data));
  };
};

export const getSubscriptions = () => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await dishesAPI.getSubscriptions();
    dispatch(actions.getDishes(res.data));
  };
};
