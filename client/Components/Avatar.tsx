import { UserOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../common/hooks";
import { subscribeT, uploadAvatarT } from "../redux/reducers/userReducer";
import style from "../styles/Avatar.module.css";

export default function UserAvatar({
  otherID,
  avatarPath,
  isOther,
}: {
  otherID?: string;
  avatarPath: string;
  isOther: boolean;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const setUserAvatar = (e) => {
    const file = e.target.files[0];
    dispatch(uploadAvatarT(file));
  };
  const subscribeToUser = () => {
    dispatch(subscribeT(otherID));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className={style.main}>
      {avatarPath && (
        <img src={avatarPath} className={style.avatar} onClick={showModal} />
      )}
      {!avatarPath && (
        <Avatar size={155} icon={<UserOutlined onClick={showModal} />} />
      )}

      {isOther && (
        <Button className={style.toProfile} onClick={subscribeToUser}>
          Подписаться
        </Button>
      )}
      {!isOther && (
        <Button
          onClick={() => router.push("/profile/edit")}
          className={style.toProfile}
        >
          Редактировать
        </Button>
      )}
      <Modal
        title="Выберите фото:"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input onChange={setUserAvatar} type="file" />
      </Modal>
    </div>
  );
}
