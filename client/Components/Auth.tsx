import { useState } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { logInT, signUpT } from "../redux/reducers/userReducer";
import style from "../styles/Auth.module.css";

export default function Auth() {
  const dispatch = useDispatch();
  const [typePage, setTypePage] = useState("LogIn");
  const signUp = (v: any) => {
    dispatch(signUpT(v));
  };
  const logIn = (v: any) => {
    dispatch(logInT(v.email, v.password));
  };
  return (
    <div className={style.auth}>
      {typePage === "LogIn" && (
        <div>
          <h2>Вход</h2>
          <Form onFinish={logIn}>
            <Form.Item name="email">
              <Input placeholder="email" className={style.input} />
            </Form.Item>
            <Form.Item name="password">
              <Input placeholder="password" className={style.input} />
            </Form.Item>
            <Button className={style.button} style={{}} htmlType="submit">
              Войти
            </Button>
          </Form>
          <span>
            Нету аккаунта?
            <a
              style={{ color: "#4287f5", marginLeft: 5 }}
              onClick={() => setTypePage("SignUp")}
            >
              Зарегестрируйтесь!
            </a>
          </span>
        </div>
      )}
      {typePage === "SignUp" && (
        <div>
          <h2>Регистрация</h2>
          <Form onFinish={signUp}>
            <Form.Item name="username">
              <Input className={style.input} placeholder="username" />
            </Form.Item>

            <Form.Item name="email">
              <Input className={style.input} placeholder="email" />
            </Form.Item>
            <Form.Item name="password">
              <Input className={style.input} placeholder="password" />
            </Form.Item>
            <Form.Item name="description">
              <Input className={style.input} placeholder="описание профиля" />
            </Form.Item>
            <Button className={style.button} htmlType="submit">
              Зарегестрироваться
            </Button>
          </Form>
          <a onClick={() => setTypePage("LogIn")}>Вход</a>
        </div>
      )}
    </div>
  );
}
