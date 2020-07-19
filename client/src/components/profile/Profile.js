import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { getProfileRequest } from "../../redux/actions/profile";
import "../profile/profile.css";
import Loading from "../others/Loading";
import ViewProfile from "./view/ViewProfile";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileRequest(user.id));
    console.log("view profile");
  }, []);

  return loading ? (
    <Loading></Loading>
  ) : profile ? (
    <ViewProfile></ViewProfile>
  ) : (
    <div className="container">
      <Link to="/edit-profile">
        <Button icon={<SettingOutlined />} size="large">
          Create Profile
        </Button>
      </Link>
    </div>
  );
};

export default Profile;
