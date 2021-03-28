import { Dispatch } from "react";
import { ActionTypes, userType } from "../../common/types";
import { authAPI } from "../../DAL/authAPI";

const initialState = {
  user: {} as userType,
};
type stateType = typeof initialState;
export const userReducer = (
  state = initialState,
  action: actionType
): stateType => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: { ...action.data },
      };
    default:
      return state;
  }
};

type actionType = ActionTypes<typeof actions>;

const actions = {
  setUser: (data: userType) => ({ type: "SET_USER", data } as const),
};

export const signUpT = (data: userType) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await authAPI.signUp(data);
    dispatch(actions.setUser(res.data.user));
    localStorage.setItem("userID", res.data.user._id);
    localStorage.setItem("accessToken", res.data.accessToken);
  };
};

export const logInT = (email: string, password: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await authAPI.logIn(email, password);
    dispatch(actions.setUser(res.data.user));
    localStorage.setItem("userID", res.data.user._id);
    localStorage.setItem("accessToken", res.data.accessToken);
  };
};
export const getUserT = () => {
  const userID = localStorage.userID;
  return async (dispatch: Dispatch<actionType>) => {
    const res = await authAPI.getUser(userID);
    dispatch(actions.setUser(res.data));
  };
};
