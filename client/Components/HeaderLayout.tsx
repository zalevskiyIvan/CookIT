import { Input } from "antd";
import React from "react";
import style from "../styles/Header.module.css";
import Link from "next/link";

export default function HeaderLayout() {
  const token = 0;
  return (
    <div>
      <div className={style.header}>
        <h2>LOGO</h2>
        <div className={style.search}>
          <Input
            placeholder="Поиск"
            style={{
              borderRadius: 16,
              width: 280,
              backgroundColor: "#333",
              border: "none",
            }}
          />
        </div>
        {!token && (
          <Link href="/auth">
            <a>
              <h2>Log In</h2>
            </a>
          </Link>
        )}
        <div className={style.name}>
          <h1>Ivan</h1>
        </div>
      </div>
    </div>
  );
}
