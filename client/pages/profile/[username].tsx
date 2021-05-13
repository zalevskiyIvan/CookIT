import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import HeaderLayout from "../../Layout/HeaderLayout";
import { useSelector } from "../../common/hooks";
import style from "../../styles/App.module.css";
import { getOtherProfileT } from "../../redux/reducers/userReducer";
import UserAvatar from "../../Components/Avatar";
import LeftNavbarLayout from "../../Components/LeftNavbarLayout";
import RecipesRenderer from "../../Components/RecipesRenderer";
import RightNavbarLayout from "../../Components/RightNavbarLayout";

const dishes = [
  { header: "Первые блюда", codeName: "firsts" },
  { header: "Вторые блюда", codeName: "seconds" },
  { header: "Десерты", codeName: "deserts" },
  { header: "Закуски", codeName: "snacks" },
  { header: "Салаты", codeName: "salats" },
  { header: "Напитки", codeName: "drinks" },
  { header: "Соусы, кремы", codeName: "souses" },
  { header: "Выпечка", codeName: "bakery" },
  { header: "Гарниры", codeName: "side_dishes" },
  { header: "Все", codeName: "all" },
];

export default function OtherProfile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.userReducer.actuallOtherUser);
  const username: any = router.query.username;
  const [params, setParams] = useState("all");
  useEffect(() => {
    dispatch(getOtherProfileT(username));
  }, [username]);

  return (
    <div>
      <div className={style.App}>
        <HeaderLayout />
        <div className={style.profileContent}>
          <div>
            <UserAvatar
              avatarPath={user.avatar}
              otherID={user._id}
              isOther={true}
            />
            <div className={style.leftNavbarProfile}>
              <LeftNavbarLayout />
            </div>
          </div>

          <div className={style.tapeProfile}>
            <div className={style.standartDiv}>
              <h1>{user.username}</h1>
              <p>{user.description}</p>
            </div>
            <div className={style.standartDiv}>
              <div className={style.recipes}>
                <div style={{ width: 600 }}>
                  <h3>Рецепты: {user.recipes && user.recipes.length}</h3>
                </div>
                {dishes.map((i) => {
                  return (
                    <div
                      className={style.recipieType}
                      onClick={() => setParams(i.codeName)}
                    >
                      {i.header}
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ marginTop: 30 }}></div>
            {user._id && <RecipesRenderer params={params} userID={user._id} />}
          </div>
          <div className={style.rightNavbar}>
            <RightNavbarLayout />
          </div>
        </div>
      </div>
    </div>
  );
}
