import React, { useState, useEffect } from "react";
import "../posts.css";
import Fade from "react-reveal/Fade";
import { Card, Avatar, Button } from "antd";
import { HeartFilled, CommentOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { likePost, unlikePost, deletePost } from "../../../redux/actions/post";
import Comments from "./Comments";

const PostsItems = ({ post, userId }) => {
  const [likebtn, setLikebtn] = useState(false);
  const dispatch = useDispatch();
  const [commentBtn, setCommentBtn] = useState(false);

  const commnetBtnFunctionality = () => {
    setCommentBtn(!commentBtn);
  };
  useEffect(() => {
    post.like.map((like) => {
      if (like.user == userId) {
        setLikebtn(true);
      }
    });
  }, []);

  const likeFunctionality = (id) => {
    if (likebtn === true) {
      dispatch(unlikePost(id));
    }
    if (likebtn === false) {
      dispatch(likePost(id));
    }

    setLikebtn(!likebtn);
  };
  const likeStyle = {
    color: likebtn ? "red" : "",
  };

  const { _id, name, user, avatar, text, url, like, comments, date } = post;

  return (
    <div className="post-container">
      <Fade left>
        <Card hoverable={true}>
          <div className="view-posts-top">
            <Avatar src={avatar} size={30}></Avatar>
            <span style={{ marginLeft: "10px" }}>{name}</span>
          </div>
          <div className="time">
            Posted {moment(date, "YYYYMMDD").fromNow()}
          </div>
          <div className="view-posts-middle">
            <span style={{ padding: "10px" }}>{text}</span>
            <img className="img-style" src={url}></img>
          </div>

          {commentBtn ? (
            <Comments
              post_id={_id}
              comments={comments}
              toggle={() => commnetBtnFunctionality()}
            />
          ) : null}

          <div className="view-posts-bottom">
            <div className="like">
              <HeartFilled
                style={likeStyle}
                onClick={() => likeFunctionality(_id)}
              />
              <span style={{ fontSize: "12px" }}>{like.length} Likes</span>
            </div>
            <div className="comments">
              <CommentOutlined onClick={() => commnetBtnFunctionality()} />
              <span style={{ fontSize: "12px" }}>
                {comments.length}Comments
              </span>
            </div>
            {user == userId ? (
              <Button
                type="primary"
                onClick={() => dispatch(deletePost(_id))}
                danger
              >
                X
              </Button>
            ) : null}
          </div>
        </Card>
      </Fade>
    </div>
  );
};

export default PostsItems;
