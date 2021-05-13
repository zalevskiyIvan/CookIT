import { Form, Input, DatePicker, Button } from "antd";
import { useDispatch } from "react-redux";
import { fullInfo } from "../common/types";
import MainLayout from "../Layout/MainLayout";
import { updateFullInfoT } from "../redux/reducers/userReducer";
import style from "../styles/EditProfile.module.css";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

export default function EditProfile() {
  const dispatch = useDispatch();
  const updateProfile = (v: fullInfo) => {
    v.username = v.first_name.concat(" ", v.last_name);
    delete v.first_name;
    delete v.last_name;
    dispatch(updateFullInfoT(v));
  };
  return (
    <MainLayout isSolo={true}>
      <Form onFinish={updateProfile} {...layout} className={style.form}>
        <Form.Item name="first_name" label="Имя">
          <Input className={style.input} />
        </Form.Item>
        <Form.Item name="last_name" label="Фамилия">
          <Input className={style.input} />
        </Form.Item>
        <Form.Item name="gender" label="Пол">
          <Input className={style.input} />
        </Form.Item>
        <Form.Item name="birthday" label="Дата рождения">
          <Input placeholder="" className={style.input} />
        </Form.Item>
        <Form.Item name="country" label="Страна">
          <Input className={style.input} />
        </Form.Item>
        <Form.Item name="city" label="Город">
          <Input className={style.input} />
        </Form.Item>
        <Form.Item name="description" label="О себе">
          <Input.TextArea
            className={style.input}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <button className={style.button} type="submit">
            Сохранить
          </button>
        </Form.Item>
      </Form>
    </MainLayout>
  );
}
