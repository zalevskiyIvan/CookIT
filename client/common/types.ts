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

export type commentsType = {
  user: string | userType;
  commentText: string;
  likeCount: number;
  post: string | dishesType;
};
export type dishesType = {
  recipie: Array<stepType>;
  description: string;
  likesCount: number;
  viewsCount: number;
  category: categoryType;
  cook: string | userType;
  ingridients: string;
  img?: string;
  comments: commentsType[];
};

export type userType = {
  email: string;
  password: string;
  username: string;
  role: string;
  avatar?: string;
  dishes: Array<dishesType> | Array<string>;
  followers: Array<userType> | string;
  following: Array<userType> | string;
  _id: string;
};
