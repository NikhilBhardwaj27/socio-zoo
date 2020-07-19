import React, { useState, useEffect } from "react";
import "./profiles.css";
import Slide from "react-reveal/Slide";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfileRequest } from "../../redux/actions/profile";
import "antd/dist/antd.css";
import { Button, Card, Avatar, Divider } from "antd";
import Loading from "../others/Loading";
import Followers from "../profile/pages/Followers";
import Following from "../profile/pages/Following";
import {
  YoutubeOutlined,
  InstagramOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Fubtton from "./Fubtton";

const ProfilesItems = ({ match }) => {
  const [followingButton, setFollowingButton] = useState(false);
  const [followersButton, setFollowersButton] = useState(false);

  const handleFollowingButton = () => {
    setFollowingButton(!followingButton);
  };

  const handleFollowersButton = () => {
    setFollowersButton(!followersButton);
  };
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileRequest(match.params.id));
  }, []);

  return loading || profile === null ? (
    <Loading></Loading>
  ) : (
    <div>
      {" "}
      <div className="container">
        <Slide top>
          <Card hoverable={true} className="view-profile-card">
            <Link to="/users">
              {" "}
              <ArrowLeftOutlined />
            </Link>
            <div className="view-profile-top-card">
              <Avatar src={profile.user.avatar} size={100} />
              <span
                className="follower"
                onClick={() => handleFollowersButton()}
              >
                Followers:{profile.followers.length}
              </span>
              <span
                className="follower"
                onClick={() => handleFollowingButton()}
              >
                Following:{profile.following.length}
              </span>
            </div>

            {followersButton && profile.followers.length > 0 ? (
              <Followers
                followers={profile.followers}
                handleFollowersButton={handleFollowersButton}
              ></Followers>
            ) : null}

            {followingButton && profile.following.length > 0 ? (
              <Following
                following={profile.following}
                handleFollowingButton={handleFollowingButton}
              ></Following>
            ) : null}

            <Divider></Divider>

            <div className="view-profile-bottom-card">
              <Fubtton followers={profile.followers} />
              <h2 style={{ margin: "10px" }}>{profile.user.username}</h2>
              {profile.bio}
              <h1 style={{ marginTop: "50px" }}>About</h1>
              <div className="card-about">
                <h3 className="follower">Relationship: </h3>
                {profile.relationshipStatus}
                <h3 className="follower">Location: </h3>
                {profile.location}
                <h3 className="follower">Webiste: </h3>
                <a href={profile.website} target="_blank">
                  {profile.website}
                </a>
                {profile.social ? (
                  <>
                    {" "}
                    <h3 className="follower">
                      <InstagramOutlined width={100} height={100} />{" "}
                    </h3>
                    <a href={profile.social.instagram} target="_blank">
                      My Insta
                    </a>
                    <h3 className="follower">
                      <YoutubeOutlined />
                    </h3>
                    <a href={profile.social.youtube} target="_blank">
                      My YouTube
                    </a>
                  </>
                ) : null}
              </div>
            </div>
          </Card>
        </Slide>
      </div>
    </div>
  );
};

export default ProfilesItems;
