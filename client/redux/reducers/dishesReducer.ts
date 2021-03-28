import { Dispatch } from "react";
import { ActionTypes, dishesType, stepType } from "../../common/types";
import { dishesAPI } from "../../DAL/dishesAPI";

const initialState = {
  dish: {} as dishesType,
  recipie: [] as Array<stepType>,
  actuallDishes: [] as Array<dishesType>,
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
        recipie: [...state.recipie, action.step],
      };
    case "SET_DISH":
      return {
        ...state,
        dish: action.dish,
      };
    case "GET_ALL_DISHES":
      return {
        ...state,
        actuallDishes: action.dishes,
      };
    default:
      return state;
  }
};
type actionType = ActionTypes<typeof actions>;

export const actions = {
  setRecipieStep: (step: stepType) => ({ type: "SET_STEP", step } as const),
  setDish: (dish: dishesType) => ({ type: "SET_DISH", dish } as const),
  getDishes: (dishes: Array<dishesType>) =>
    ({
      type: "GET_ALL_DISHES",
      dishes,
    } as const),
};

export const publishT = (dish: dishesType, recipie: Array<stepType>) => {
  return async (dispatch: Dispatch<actionType>) => {
    dish.recipie = recipie;
    await dishesAPI.publishDishes(dish);
  };
};

export const getDishesT = (category: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await dishesAPI.getDishes(category);
    dispatch(actions.getDishes(res.data));
  };
};
