import Link from "next/link";
import React from "react";
import style from "../styles/RightNavbar.module.css";

export default function RightNavbarLayout() {
  return (
    <div className={style.widget}>
      <ul className={style.widget_list}>
        <Link href="/recipies">
          <a>Все</a>
        </Link>
        <Link href="/recipies/firsts">
          <a>Первые блюда</a>
        </Link>
        <Link href="/recipies/seconds">
          <a>Вторые блюда</a>
        </Link>
        <Link href="/recipies/deserts">
          <a>Десерты</a>
        </Link>
        <Link href="/recipies/snacks">
          <a>Закуски</a>
        </Link>
        <Link href="/recipies/salats">
          <a>Салаты</a>
        </Link>
        <Link href="/recipies/drinks">
          <a>Напитки</a>
        </Link>
        <Link href="/recipies/souses">
          <a>Соусы, кремы</a>
        </Link>
        <Link href="/recipies/bakery">
          <a>Выпечка</a>
        </Link>
        <Link href="/recipies/side_dishes">
          <a>Гарниры</a>
        </Link>
      </ul>
    </div>
  );
}
