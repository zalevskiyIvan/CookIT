import Link from "next/link";
import React from "react";
import style from "../styles/LeftNavbar.module.css";

export default function LeftNavbarLayout() {
  return (
    <div className={style.widget}>
      <ul className={style.widget_list}>
        <Link href="/recipies">
          <a>
            <img src="/img/Feed.png" style={{ width: 35 }} />
            <span style={{ marginLeft: 9 }}>Лента</span>
          </a>
        </Link>
        <Link href="/recipes/my">
          <a>
            <img src="/img/My_recipies.png" style={{ width: 35 }} />
            <span style={{ marginLeft: 9 }}>Мои рецепты</span>
          </a>
        </Link>
        <Link href="/messages">
          <a>
            <img src="/img/Messages.png" style={{ width: 35 }} />
            <span style={{ marginLeft: 9 }}>Сообщения</span>
          </a>
        </Link>
        <Link href="/notes">
          <a>
            <img src="/img/Notes.png" style={{ width: 35 }} />
            <span style={{ marginLeft: 9 }}>Заметки</span>
          </a>
        </Link>
      </ul>
    </div>
  );
}
