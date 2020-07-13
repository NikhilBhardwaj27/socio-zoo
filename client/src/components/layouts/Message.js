import React, { Fragment } from "react";
import { message } from "antd";
import { connect } from "react-redux";
import "../layouts/layout.css";
import "antd/dist/antd.css";

const Message = ({ messages }) => {
  const { payload } = messages;

  const setMessage = () => {
    if (payload) {
      if (payload.messageType === "success") {
        return message.success(payload.text);
      }
      if (payload.messageType === "error") {
        return message.error(payload.text);
      }
    }
  };
  return <Fragment>{setMessage(messages)}</Fragment>;
};

const mapStateToProps = (state) => {
  return { messages: state.message };
};

export default connect(mapStateToProps)(Message);
