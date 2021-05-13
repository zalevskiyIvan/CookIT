type properties<T> = T extends { [key: string]: infer U } ? U : never;
export type ActionTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<properties<T>>;

export type categoryType =
  | "firstD"
  | "secondD"
  | "deserts"
  | "snacks"
  | "salats"
  | "drinks"
  | "souses"
  | "backery"
  | "sideD";

export type stepType = { id: number; img?: string; stepDescription: string };

export type commentType = {
  title: string;
  childrenID?: commentType[];
  userID?: userType;
  postID: string | recipeType;
  _id?: string;
  parentID?: string | userType;
};

export type recipeType = {
  recipe: Array<stepType>;
  description: string;
  likesCount: number;
  category: categoryType;
  cook: userType;
  ingredients: string;
  img?: string;
  comments: commentType[];
  _id: string;
  header: string;
};

export type fullInfo = {
  gender: string;
  birthday: string;
  country: string;
  city: string;
  first_name?: string;
  last_name?: string;
  description?: string;
  username?: string;
};

export type userType = {
  email: string;
  password: string;
  username: string;
  role: string;
  avatar?: string;
  recipes: Array<recipeType> | Array<string>;
  followers: Array<userType> | string;
  subscriptions: Array<userType> | string;
  _id: string;
  isAuthorized: boolean;
  description: string;
  fullInfo: fullInfo;
};
