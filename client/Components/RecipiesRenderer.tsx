import { HeartOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "../common/hooks";
import { getDishesT } from "../redux/reducers/dishesReducer";
import { dishesType } from "../common/types";
import style from "../styles/Tape.module.css";

export default function RecipiesRenderer({ params }: string | any) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.dishesReducer.actuallDishes);
  const router = useRouter();
  // const token = localStorage.getItem("accessToken");
  const token = 1; // ! fix

  const goToAdd_Recipie = () => {
    token && router.push("/recipies/add");
  };
  useEffect(() => {
    dispatch(getDishesT(params));
  }, [params]);
  return (
    <div>
      <div onClick={goToAdd_Recipie} className={style.newRecipe}>
        <div className={style.plus}>
          <PlusOutlined style={{ fontSize: 43 }} />
        </div>
        <h1 className={style.h1}>Новый рецепт</h1>
      </div>

      {state.map((i: dishesType) => {
        if (!i.likesCount) i.likesCount = 0;
        return (
          <div className={style.post}>
            <p className={style.postText}>{i.description}</p>
            {i.img && <img className={style.img} src={i.img} />}
            <div className={style.underImg}>
              <HeartOutlined className={style.heart} />
              <h2>{i.likesCount}</h2>

              <div className={style.comments}>
                <img src="/img/Comment.png" style={{ width: 50, height: 40 }} />
              </div>
              <h2>{i.comments.length}</h2>
              <div className={style.book}>
                <img
                  src="/img/Book.png"
                  title="добавить в закладки"
                  style={{ width: 50, height: 40 }}
                />
              </div>

              <h1>{i.viewsCount}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}
