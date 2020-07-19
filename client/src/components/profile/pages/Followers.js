import React, { useState } from "react";
import { Modal, Button, Avatar } from "antd";

const Followers = ({ followers, handleFollowersButton }) => {
  const [visible, setVisible] = useState(true);

  const handleOk = (e) => {
    handleFollowersButton();
    setVisible(false);
  };

  const handleCancel = (e) => {
    handleFollowersButton();
    setVisible(false);
  };
  return (
    <div>
      <Modal
        title="Followers"
        visible={visible}      
        bodyStyle={modalStyle}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {followers.map((follower) => (
          <div style={{ marginBottom: "10px" }}>
            <Avatar src={follower.avatar}></Avatar>
            <span style={{ marginLeft: "60px" }}>{follower.username}</span>
          </div>
        ))}
      </Modal>
    </div>
  );
};


const modalStyle = {
  height: "40vh",
  overflowY: "auto",
};

export default Followers;
