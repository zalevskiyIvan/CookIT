import { Avatar, Comment, Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CustomInput from "../common/custom/CustomInput";
import { useSelector } from "../common/hooks";
import { commentType } from "../common/types";
import {
  commentChildT,
  getCommentChildrenT,
} from "../redux/reducers/recipesReducer";

export default function Comments({ comment }: { comment: commentType }) {
  const dispatch = useDispatch();

  const [comChildMod, setComChildMod] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const addCommentChild = (commentID: string, { title }: { title: string }) => {
    dispatch(commentChildT(commentID, title));
  };
  const getChildren = () => {
    dispatch(getCommentChildrenT(comment._id));
    setShowReplies(true);
  };
  const children = useSelector((state) => state.dishesReducer.commentChilds);
  return (
    <div>
      <Comment
        author={
          <div>
            <span>{comment.userID.username} </span>
            {comment.childrenID && (
              <a
                style={{ color: "#4287f5", marginLeft: 5 }}
                onClick={() => setComChildMod(true)}
              >
                Reply
              </a>
            )}
          </div>
        }
        avatar={
          (comment.userID.avatar && <img src={comment.userID.avatar} />) ||
          (!comment.userID.avatar && (
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          ))
        }
        content={
          <div>
            <p>
              {comment.title}
              {comment.childrenID?.length > 0 && !showReplies && (
                <a
                  onClick={getChildren}
                  style={{ color: "#428dd4", marginLeft: 10 }}
                >
                  {comment.childrenID.length} replies
                </a>
              )}
            </p>

            {comChildMod && (
              <Form
                onFinish={(value) => addCommentChild(comment._id, value)}
                style={{ width: 300, marginTop: 5 }}
              >
                <Form.Item name="title">
                  <Input
                    placeholder="Reply this comment..."
                    style={{
                      borderRadius: 2,
                      width: 250,
                      backgroundColor: "#333",
                      border: "none",
                    }}
                  />
                </Form.Item>
              </Form>
            )}

            {showReplies &&
              children?.map((i: commentType) => {
                debugger;
                return (
                  <Comment
                    avatar={
                      (!i.userID.avatar && (
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      )) ||
                      (i.userID.avatar && <img src={i.userID.avatar} />)
                    }
                    author={<span>{i.userID.username} </span>}
                    content={<p>{i.title}</p>}
                  />
                );
              })}
          </div>
        }
      />
    </div>
  );
}
