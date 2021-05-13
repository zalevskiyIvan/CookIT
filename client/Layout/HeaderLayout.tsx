import { Input } from "antd";
import React, { useEffect, useState } from "react";
import style from "../styles/Header.module.css";
import Link from "next/link";
import { useSelector } from "../common/hooks";
import CustomInput from "../common/custom/CustomInput";

export default function HeaderLayout() {
  const user = useSelector((state) => state.userReducer.user);
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  return (
    <div>
      <div className={style.header}>
        <h2>LOGO</h2>
        <div className={style.search}>
          <CustomInput placeholder="Поиск" width={280} />
        </div>
        {!isAuth && (
          <Link href="/auth">
            <a className={style.name}>
              <h2>Log In</h2>
            </a>
          </Link>
        )}
        {isAuth && (
          <div className={style.name}>
            <h2>{user.username}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
