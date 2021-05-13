import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { PageContext } from "../common/contexts/recipiePageContext";
import { recipeType } from "../common/types";
import MainLayout from "../Layout/MainLayout";
import { RecipieHeaderLayout, RecipieBody } from "../Layout/RecipieLayout";
import style from "../styles/FullRecipe.module.css";

export default function FullRecipe({ state }: { state: recipeType }) {
  const [step, setStep] = useState(1);
  let recipeStepCount = 0;
  if (state.recipe) recipeStepCount = state.recipe.length;
  return (
    <MainLayout isSolo={true}>
      <div className={style.all}>
        <div className={style.main}>
          <PageContext.Provider value={{ step, setStep, recipeStepCount }}>
            <RecipieHeaderLayout>
              {step === 1 && (
                <span style={{ fontSize: 35, marginLeft: 270 }}>
                  {state.header}
                </span>
              )}
              {step >= 2 && (
                <span style={{ fontSize: 35, marginLeft: 220 }}>
                  Шаг {step - 1}
                </span>
              )}
            </RecipieHeaderLayout>
          </PageContext.Provider>
          {step === 1 && (
            <RecipieBody img={state.img} underImgData={state.ingredients} />
          )}
          {step >= 2 && (
            <div>
              {state.recipe
                .filter((i) => i.id === step - 1)
                .map((el) => {
                  return (
                    <RecipieBody
                      img={el.img}
                      underImgData={el.stepDescription}
                    />
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
