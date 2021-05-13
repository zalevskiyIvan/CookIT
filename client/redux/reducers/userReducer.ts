import { AxiosResponse } from "axios";
import { Dispatch } from "react";
import { ActionTypes, fullInfo, userType } from "../../common/types";
import { userAPI } from "../../DAL/userAPI";

const initialState = {
  user: {} as userType,
  isAuth: false,
  actuallOtherUser: {} as userType,
  avatar: "",
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
    case "SET_IS_AUTH":
      return {
        ...state,
        isAuth: action.isAuth,
      };
    case "SET_OTHER_USER":
      return {
        ...state,
        actuallOtherUser: { ...action.data },
      };
    case "SET_AVATAR":
      return {
        ...state,
        avatar: action.avatar,
      };
    default:
      return state;
  }
};

type actionType = ActionTypes<typeof actions>;

type resType<T> = {
  error?: any;
  data: T;
};

export const actions = {
  setUser: (data: userType) => ({ type: "SET_USER", data } as const),
  setOtherUser: (data: userType) => ({ type: "SET_OTHER_USER", data } as const),
  setIsAuth: (isAuth: boolean) => ({ type: "SET_IS_AUTH", isAuth } as const),
  setAvatar: (avatar: string) => ({ type: "SET_AVATAR", avatar } as const),
};

export const signUpT = (data: userType) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await userAPI.signUp(data);
    res.data.user.isAuthorized = true;
    dispatch(actions.setUser(res.data.user));
    localStorage.setItem("userID", res.data.user._id);
  };
};

export const logInT = (email: string, password: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await userAPI.logIn(email, password);
    res.data.user.isAuthorized = true;
    dispatch(actions.setUser(res.data.user));
    localStorage.setItem("userID", res.data.user._id);
  };
};

export const getUserT = () => {
  const userID = localStorage.userID;
  return async (dispatch: Dispatch<actionType>) => {
    const res = await userAPI.getUser(userID);
    dispatch(actions.setUser(res.data));
  };
};

export const authCheckT = () => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await userAPI.authCheck();
    if (res.error) dispatch(actions.setIsAuth(false));
    dispatch(actions.setUser(res.data));
    dispatch(actions.setIsAuth(true));
  };
};

export const getMyProfileT = () => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await userAPI.getMyProfile();
    if (res.error?.response.status == 403) actions.setIsAuth(false);
    if (typeof res.data === typeof actions.setUser) {
      dispatch(actions.setUser(res?.data?.data));
    }
  };
};

export const getOtherProfileT = (username: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await userAPI.getProfile(username);
    dispatch(actions.setOtherUser(res.data));
  };
};

export const uploadAvatarT = (file: File) => {
  const formData = new FormData();
  formData.append("photo", file);
  return async (dispatch: Dispatch<actionType>) => {
    const res: any = await userAPI.uploadAvatar(formData);
    if (res.error?.response.status == 403) actions.setIsAuth(false);

    dispatch(actions.setAvatar(res.data));
  };
};

export const updateFullInfoT = (data: fullInfo) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await userAPI.updateFullInfo(data);
    if (res.error?.response.status == 403) actions.setIsAuth(false);
  };
};

export const subscribeT = (otherID: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await userAPI.subscribe(otherID);
    if (res.error?.response.status == 403) actions.setIsAuth(false);
  };
};
