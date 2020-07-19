import React, { useState, useEffect } from "react";
import { Modal, Button, Skeleton, Input, Avatar } from "antd";
import "../posts.css";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../../../redux/actions/post";

const Comments = ({ post_id, comments, toggle }) => {
  const loading = useSelector((state) => state.post.commentsLoading);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    visible: true,
    text: "",
  });

  const handleCancel = (e) => {
    toggle();
    setState({
      visible: false,
    });
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(addComment(post_id, state.text));

    setState({ text: "" });
  };

  return (
    <div>
      <Modal
        title="Comments"
        visible={true}
        bodyStyle={modalStyle}
        footer={[
          <Input
            onChange={(e) => onChange(e)}
            value={state.text}
            name="text"
          />,
          <Button style={{ marginTop: "3px" }} onClick={() => handleSubmit()}>
            Post
          </Button>,
        ]}
        onCancel={() => handleCancel()}
      >
        <Skeleton active loading={loading}>
          <div className="comments">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <>
                  <div className="comments-body">
                    <Avatar src={comment.avatar}></Avatar>
                    <span style={{ marginLeft: "5px" }}>{comment.name}</span>
                    <p style={{ marginLeft: "40px" }}>
                      {"->"}
                      {comment.text}
                    </p>
                  </div>
                </>
              ))
            ) : (
              <h4>No comments on this post</h4>
            )}
          </div>
        </Skeleton>
      </Modal>
    </div>
  );
};

const modalStyle = {
  height: "40vh",
  overflowY: "auto",
};

export default Comments;
