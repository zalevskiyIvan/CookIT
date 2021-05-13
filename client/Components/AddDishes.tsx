import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { Option } from "antd/lib/mentions";
import Modal from "antd/lib/modal/Modal";
import router from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "../styles/AddDishes.module.css";
import { useSelector } from "../common/hooks";
import { recipeType } from "../common/types";
import { actions, publishT } from "../redux/reducers/recipesReducer";
import AddRecipie from "./AddRecipe";

export default function AddDishes() {
  const dish = useSelector((state) => state.dishesReducer.dish);
  const recipie = useSelector((state) => state.dishesReducer.recipe);
  const dispatch = useDispatch();
  const [screenNumber, setScreenNumber] = useState(1);
  const [dishes, setDishes] = useState({} as recipeType);
  useEffect(() => {
    if (screenNumber === 2) {
      dispatch(actions.setDish(dishes));
    }
  }, [screenNumber]);
  const dishesSubmit = (v: any) => {
    v.likeCount = 0;
    v.commentsCount = 0;
    v.viewsCount = 0;
    v.recipe = [];
    v.cook = localStorage.userID;
    setDishes(v);
    setScreenNumber(screenNumber + 1);
  };

  const prevPage = () => {
    setScreenNumber(screenNumber - 1);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const publish = () => {
    dispatch(publishT(dish, recipie));
    router.push("/recipes");
  };
  const [plusImg, setPlusImg] = useState("");
  const changeImg = (v: any) => {
    console.log(v.target.value);
    setPlusImg(v.target.value);
  };
  return (
    <div className={style.main}>
      {screenNumber === 1 && (
        <div>
          <div>
            <Form onFinish={dishesSubmit}>
              <Form.Item
                rules={[{ required: true, message: "Введите название" }]}
                required={true}
                name="header"
              >
                <Input
                  className={style.header}
                  style={{
                    backgroundColor: "#181a1b",
                    color: "#b8b4ad",
                    marginBottom: 0,
                  }}
                  bordered={false}
                  placeholder="Название..."
                />
              </Form.Item>
              <h1>Обложка:</h1>
              {!plusImg && (
                <div className={style.addImg} onClick={showModal}>
                  <PlusOutlined style={{ color: "#212425", fontSize: 100 }} />
                </div>
              )}
              {plusImg && (
                <img
                  onClick={showModal}
                  className={style.plusImg}
                  src={plusImg}
                />
              )}
              <Modal
                title="Добавление картинки"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Form.Item name="img">
                  <Input
                    onChange={changeImg}
                    placeholder="ссылка на картинку"
                  />
                </Form.Item>
              </Modal>
              <Form.Item name="ingredients">
                <Input
                  className={style.header}
                  style={{
                    backgroundColor: "#181a1b",
                    color: "#b8b4ad",
                    marginBottom: 0,
                  }}
                  bordered={false}
                  placeholder="Ингридиенты..."
                />
              </Form.Item>
              <Form.Item
                required={true}
                rules={[{ required: true, message: "Укажите категорию" }]}
                name="category"
              >
                <Select
                  className={style.header}
                  style={{
                    backgroundColor: "#181a1b",
                    width: 440,
                    cursor: "pointer",
                    marginBottom: 0,
                  }}
                  bordered={false}
                  placeholder="Категория..."
                >
                  <Option value="firsts">Первые блюда</Option>
                  <Option value="seconds">Вторые блюда</Option>
                  <Option value="deserts">Десерты</Option>
                  <Option value="snacks">Закуски</Option>
                  <Option value="salats">Салаты</Option>
                  <Option value="drinks">Напитки</Option>
                  <Option value="souses">Соусы, кремы</Option>
                  <Option value="backery">Выпечка</Option>
                  <Option value="sideD">Гарниры</Option>
                </Select>
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Введите описание" }]}
                required={true}
                name="description"
              >
                <Input.TextArea
                  autoSize={{ minRows: 4 }}
                  style={{
                    backgroundColor: "#181a1b",
                    color: "#b8b4ad",
                    width: 440,
                    borderRadius: 18,
                  }}
                  bordered={false}
                  placeholder="Описание..."
                />
              </Form.Item>
              <div className={style.navigation}>
                <div onClick={prevPage} className={style.back}>
                  <h2>Назад</h2>
                </div>
                <div className={style.forward}>
                  <Button
                    style={{
                      backgroundColor: "#181a1b",
                      border: "none",
                    }}
                    htmlType="submit"
                  >
                    <h2>Далее</h2>
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      )}
      {screenNumber === 2 && (
        <div>
          <AddRecipie />
          <div className={style.navigation}>
            <div onClick={prevPage} className={style.back}>
              <h2>Назад</h2>
            </div>
            <div onClick={publish} className={style.forward}>
              <h2>опубликовать</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
