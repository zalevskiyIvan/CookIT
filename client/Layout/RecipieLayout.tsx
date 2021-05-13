import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { FC, useContext, useState } from "react";
import { PageContext } from "../common/contexts/recipiePageContext";
import style from "../styles/FullRecipe.module.css";

export function RecipieHeaderLayout({ children }) {
  const { step, setStep, recipeStepCount }: any = useContext(PageContext);
  const forward = () => {
    setStep(step + 1);
  };
  const back = () => {
    setStep(step - 1);
  };
  return (
    <div className={style.main}>
      {step !== 1 && (
        <LeftOutlined
          style={{
            fontSize: 30,
            marginLeft: 35,
          }}
          onClick={back}
        />
      )}

      {children}
      {recipeStepCount !== step - 1 && (
        <RightOutlined
          onClick={forward}
          style={{
            fontSize: 30,
            float: "right",
            marginRight: 35,
            marginTop: 10,
          }}
        />
      )}
    </div>
  );
}
type RecipieBodyType = {
  img: string;
  underImgData: string;
};
export const RecipieBody: FC<RecipieBodyType> = ({ img, underImgData }) => {
  return (
    <div>
      <img className={style.img} src={img} />
      <p className={style.description}>{underImgData}</p>
    </div>
  );
};
