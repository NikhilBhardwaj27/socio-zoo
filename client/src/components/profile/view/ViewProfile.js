import React, { useState, useEffect } from "react";
import Slide from "react-reveal/Slide";
import { Button, Card, Avatar, Divider } from "antd";
import { useSelector } from "react-redux";
import "../profile.css";
import Followers from "../pages/Followers";
import Following from "../pages/Following";
import {
  EditTwoTone,
  YoutubeOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const ViewProfile = () => {
  const [followingButton, setFollowingButton] = useState(false);
  const [followersButton, setFollowersButton] = useState(false);

  const handleFollowingButton = () => {
    setFollowingButton(!followingButton);
  };

  const handleFollowersButton = () => {
    setFollowersButton(!followersButton);
  };

  const user = useSelector((state) => state.profile.profile.user);
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const { username, avatar } = user;

  const [formData, setFormData] = useState({
    bio: "",
    relationshipStatus: "",
    location: "",
    website: "",
    youtube: "",
    instagram: "",
    followers: [],
    following: [],
  });

  useEffect(() => {
    setFormData({
      bio: loading || !profile.bio ? "" : profile.bio,
      relationshipStatus:
        loading || !profile.relationshipStatus
          ? ""
          : profile.relationshipStatus,
      location: loading || !profile.location ? "" : profile.location,
      website: loading || !profile.website ? "" : profile.website,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
      followers:
        loading || profile.followers.length > 0 ? profile.followers : [],
      following:
        loading || profile.following.length > 0 ? profile.following : [],
    });
  }, []);

  const {
    bio,
    relationshipStatus,
    location,
    website,
    youtube,
    instagram,
    followers,
    following,
  } = formData;

  return (
    <div>
      <div className="container">
        <Slide top>
          <Card hoverable={true} className="view-profile-card">
            <Link to="/edit-profile">
              <EditTwoTone />
              Edit profile
            </Link>
            <div className="view-profile-top-card">
              <Avatar src={avatar} size={100} />
              <span
                className="follower"
                onClick={() => handleFollowersButton()}
              >
                Followers:{followers.length}
              </span>
              <span
                className="follower"
                onClick={() => handleFollowingButton()}
              >
                Following:{following.length}
              </span>
            </div>

            {followersButton && followers.length > 0 ? (
              <Followers
                followers={followers}
                handleFollowersButton={handleFollowersButton}
              ></Followers>
            ) : null}

            {followingButton && following.length > 0 ? (
              <Following
                following={following}
                handleFollowingButton={handleFollowingButton}
              ></Following>
            ) : null}

            <Divider></Divider>

            <div className="view-profile-bottom-card">
              {" "}
              <h2 style={{ margin: "10px" }}>{username}</h2>
              {bio}
              <h1 style={{ marginTop: "50px" }}>About</h1>
              <div className="card-about">
                <h3 className="follower">Relationship: </h3>
                {relationshipStatus}
                <h3 className="follower">Location: </h3>
                {location}
                <h3 className="follower">Webiste: </h3>
                <a href={website} target="_blank">
                  {website}
                </a>
                <h3>
                  <InstagramOutlined />{" "}
                </h3>
                <a href={instagram} target="_blank">
                  My Insta
                </a>
                <h3>
                  <YoutubeOutlined />
                </h3>
                <a href={youtube} target="_blank">
                  My YouTube
                </a>
              </div>
            </div>
          </Card>
        </Slide>
      </div>
    </div>
  );
};

export default ViewProfile;
