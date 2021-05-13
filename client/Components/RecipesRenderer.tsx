import { HeartOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "../common/hooks";
import {
  addToBookmarksT,
  commentT,
  getBookmarksT,
  getCommentsT,
  getDishesT,
  getSubscriptions,
  likePostT,
} from "../redux/reducers/recipesReducer";
import { recipeType, userType } from "../common/types";
import style from "../styles/RecipeRenderer.module.css";
import { NewRecipie } from "./NewRecipe";
import Avatar from "antd/lib/avatar/avatar";
import { actions } from "../redux/reducers/userReducer";
import { Input, Form } from "antd";
import Comments from "./Comments";

export default function RecipesRenderer({
  params,
  userID,
}: {
  params: string | any;
  userID?: string;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector((state) => state.dishesReducer.actuallDishes);
  // if (isAuth) {
  //   router.push("/auth");
  // }
  if (params !== "bookmarks" && params !== "subscriptions") {
    useEffect(() => {
      !userID && dispatch(getDishesT(params));
      userID && dispatch(getDishesT(params, userID));
    }, [params]);
  }
  if (params === "bookmarks") {
    useEffect(() => {
      dispatch(getBookmarksT());
    }, []);
  }
  if (params === "subscriptions") {
    useEffect(() => {
      dispatch(getSubscriptions());
    }, []);
  }
  const like = (postID: string) => {
    dispatch(likePostT(postID));
  };
  const addToBookmarks = (postID: string) => {
    dispatch(addToBookmarksT(postID));
  };
  const goToOtherProfile = (user: userType) => {
    dispatch(actions.setOtherUser(user));
    router.push(`/profile/${user.username}`);
  };
  const toPost = (postID: string) => {
    router.push(`/${postID}`);
  };
  const [isComments, setIsComments] = useState(null);
  const [pcID, setPcID] = useState(""); // id of the post whose comments are open
  const getComments = (recipeID: string) => {
    dispatch(getCommentsT(recipeID));
    setIsComments(!isComments);
    setPcID(recipeID);
  };
  const addComment = (postID: string, { title }: any) => {
    dispatch(commentT(postID, title));
  };

  const comments = useSelector((state) => state.dishesReducer.actuallComments);
  return (
    <div>
      <NewRecipie />
      {state?.map((i: recipeType) => {
        return (
          <div key={i._id} className={style.post}>
            <div
              onClick={() => goToOtherProfile(i.cook)}
              style={{ marginLeft: 20, paddingTop: 15 }}
            >
              {i.cook.avatar && (
                <img src={i.cook.avatar} className={style.avatar} />
              )}
              {!i.cook.avatar && <Avatar size={60} icon={<UserOutlined />} />}

              <span style={{ fontSize: 23, marginLeft: 10 }}>
                {i.cook?.username}
              </span>
            </div>
            <div style={{ cursor: "pointer" }} onClick={() => toPost(i._id)}>
              <p className={style.postText}>{i.description}</p>
              {i.img && <img className={style.img} src={i.img} />}
            </div>
            <div className={style.underImg}>
              <img
                src="/img/Heart.png"
                className={style.heart}
                onClick={() => like(i._id)}
              />

              <h2>{i.likesCount}</h2>

              <div className={style.comments}>
                <img
                  onClick={() => getComments(i._id)}
                  src="/img/Comment.png"
                  style={{ width: 50, height: 40 }}
                />
              </div>
              <h2>{i.comments?.length}</h2>

              <div className={style.book} onClick={() => addToBookmarks(i._id)}>
                <img
                  src="/img/Book.png"
                  title="добавить в закладки"
                  style={{ width: 50, height: 40 }}
                />
              </div>
            </div>
            {isComments && pcID === i._id && (
              <div style={{ marginLeft: 80 }}>
                {comments?.map((comment) => {
                  return <Comments key={comment._id} comment={comment} />;
                })}
                <Form
                  onFinish={(value) => addComment(i._id, value)}
                  style={{ width: 300 }}
                >
                  <Form.Item name="title">
                    <Input
                      placeholder="Leave a comment..."
                      style={{
                        borderRadius: 2,
                        width: 250,
                        backgroundColor: "#333",
                        border: "none",
                        marginBottom: 10,
                      }}
                    />
                  </Form.Item>
                </Form>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
