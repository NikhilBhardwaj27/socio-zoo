import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import {
  followRequest,
  unFollowRequest,
  getProfileRequest,
} from "../../redux/actions/profile";
import { Link } from "react-router-dom";

const Fubtton = ({ followers }) => {
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();

  let temp = 0;
  for (let i = 0; i < followers.length; i++) {
    if (followers[i]._id == user.id) {
      temp = 1;
      return (
        <div>
          <Button icon={<CheckOutlined />} style={{ marginRight: "10px" }}>
            Following
          </Button>
          <Button
            type="primary"
            onClick={() => {
              dispatch(unFollowRequest(profile.user._id));
            }}
          >
            UnFollow
          </Button>
        </div>
      );
    }
  }
  if (temp == 0) {
    return (
      <Button
        type="primary"
        onClick={() => {
          dispatch(followRequest(profile.user._id));
        }}
      >
        Follow
      </Button>
    );
  }
};

export default Fubtton;
