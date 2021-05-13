import { useRouter } from "next/router";
import React, { FC } from "react";
import { useSelector } from "../common/hooks";
import style from "../styles/RecipeRenderer.module.css";

export const NewRecipie: FC = () => {
  const router = useRouter();
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const goToAdd_Recipie = () => {
    isAuth && router.push("/recipes/add");
    !isAuth && alert("Войдите!");
  };
  return (
    <div onClick={goToAdd_Recipie} className={style.newRecipe}>
      <div className={style.plus}>
        <img src="/img/Plus.png" />
      </div>
      <h1 className={style.h1}>Новый рецепт</h1>
    </div>
  );
};
