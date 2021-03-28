import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import style from "../styles/AddDishes.module.css";
import { stepType } from "../common/types";
import { actions } from "../redux/reducers/dishesReducer";

export default function AddRecipie() {
  const dispatch = useDispatch();
  const formRef: any = useRef(null);

  const [stepCount, setStepCount] = useState(1);

  const [formFlow, setFormFlow] = useState({} as stepType);

  const formHandleChange = (v: any) => {
    console.log(formRef);
  };

  const nextStep = ({
    stepDescription,
    img,
  }: {
    stepDescription: string;
    img?: string;
  }) => {
    const step = { id: stepCount, stepDescription, img };
    dispatch(actions.setRecipieStep(step));
    formRef.current.resetFields();
    setStepCount(stepCount + 1);
  };

  const [plusImg, setPlusImg] = useState("");

  const changeImg = (v: any) => {
    console.log(v.target.value);
    setPlusImg(v.target.value);
  };
  // modal:

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
  // ! 2 onFinish для Form

  return (
    <div className={style.main}>
      <div>
        <div className={style.header}>
          <h1>Шаг {stepCount}</h1>
        </div>
        <h1>Обложка:</h1>
        {!plusImg && (
          <div className={style.addImg} onClick={showModal}>
            <PlusOutlined style={{ color: "#212425", fontSize: 100 }} />
          </div>
        )}
        {plusImg && (
          <img onClick={showModal} className={style.plusImg} src={plusImg} />
        )}
        <Form
          onChange={formHandleChange}
          ref={formRef}
          onFinish={nextStep}
          className={style.description}
        >
          <Form.Item
            rules={[{ required: true, message: "Введите описание" }]}
            name="stepDescription"
          >
            <Input.TextArea
              autoSize={{ minRows: 5 }}
              style={{
                backgroundColor: "#181a1b",
                color: "#b8b4ad",
                borderRadius: 18,
              }}
              bordered={false}
              placeholder="Описание..."
            />
          </Form.Item>
          <Modal
            title="Добавление картинки"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form.Item name="img">
              <Input onChange={changeImg} placeholder="ссылка на картинку" />
            </Form.Item>
          </Modal>
          <Button
            className={style.nextStep}
            style={{
              backgroundColor: " #181a1b",
              border: "none",
            }}
            htmlType="submit"
          >
            <div>
              <h2>Следующий шаг</h2>
            </div>
          </Button>
        </Form>
        <div
          style={{
            height: 37,
            border: "none",
          }}
        ></div>
      </div>
    </div>
  );
}
