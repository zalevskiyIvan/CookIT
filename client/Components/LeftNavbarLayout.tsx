import Link from "next/link";
import React from "react";
import style from "../styles/LeftNavbar.module.css";

export default function LeftNavbarLayout() {
  return (
    <div className={style.widget}>
      <ul className={style.widget_list}>
        <Link href="/recipes">
          <a>
            <img src="/img/Feed.png" style={{ width: 35 }} />
            <span style={{ marginLeft: 9 }}>Лента</span>
          </a>
        </Link>
        <Link href="/profile">
          <a>
            <img src="/img/My_recipes.png" style={{ width: 35 }} />
            <span style={{ marginLeft: 9 }}>Профиль</span>
          </a>
        </Link>
        <Link href="/subscriptions">
          <a>
            <img src="/img/Followers.png" style={{ width: 35 }} />
            <span style={{ marginLeft: 9 }}>Подписки</span>
          </a>
        </Link>
        <Link href="/bookmarks">
          <a>
            <img src="/img/Notes.png" style={{ width: 35 }} />
            <span style={{ marginLeft: 9 }}>Закладки</span>
          </a>
        </Link>
      </ul>
    </div>
  );
}
