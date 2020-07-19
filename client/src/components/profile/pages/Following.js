import React, { useState } from "react";
import { Modal, Button, Avatar } from "antd";

const Following = ({ following, handleFollowingButton }) => {
  const [visible, setVisible] = useState(true);

  const handleOk = (e) => {
    handleFollowingButton();
    setVisible(false);
  };

  const handleCancel = (e) => {
    handleFollowingButton();
    setVisible(false);
  };
  return (
    <div>
      <Modal
        title="Following"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {following.map((following) => (
          <div style={{ marginBottom: "10px" }}>
            <Avatar src={following.avatar}></Avatar>
            <span style={{ marginLeft: "60px" }}>{following.username}</span>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default Following;
