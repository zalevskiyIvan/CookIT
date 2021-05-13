import Link from "next/link";
import React from "react";
import style from "../styles/RightNavbar.module.css";

export default function RightNavbarLayout() {
  return (
    <div className={style.widget}>
      <ul className={style.widget_list}>
        <Link href="/recipes">
          <a>Все</a>
        </Link>
        <Link href="/recipes/firsts">
          <a>Первые блюда</a>
        </Link>
        <Link href="/recipes/seconds">
          <a>Вторые блюда</a>
        </Link>
        <Link href="/recipes/deserts">
          <a>Десерты</a>
        </Link>
        <Link href="/recipes/snacks">
          <a>Закуски</a>
        </Link>
        <Link href="/recipes/salats">
          <a>Салаты</a>
        </Link>
        <Link href="/recipes/drinks">
          <a>Напитки</a>
        </Link>
        <Link href="/recipes/souses">
          <a>Соусы, кремы</a>
        </Link>
        <Link href="/recipes/bakery">
          <a>Выпечка</a>
        </Link>
        <Link href="/recipes/side_dishes">
          <a>Гарниры</a>
        </Link>
      </ul>
    </div>
  );
}
