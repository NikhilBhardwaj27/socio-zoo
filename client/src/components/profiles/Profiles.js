import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfiles, getProfileRequest } from "../../redux/actions/profile";
import Loading from "../others/Loading";
import Zoom from "react-reveal/Zoom";
import { Link } from "react-router-dom";
import { Button, Card, Avatar } from "antd";
import "./profiles.css";

const Profiles = () => {
  const profiles = useSelector((state) => state.profile.profiles);
  const loading = useSelector((state) => state.profile.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfiles());
  }, []);

  return loading ? (
    <Loading></Loading>
  ) : (
    <div className="containers">
      {profiles.length > 0
        ? profiles.map((profile) => (
            <Zoom left>
              <Card id={profile._id} hoverable={true} className="card">
                <div className="view-profiles">
                  <Avatar src={profile.user.avatar} size={100}></Avatar>
                  {profile.user.username}
                  <Button>
                    {" "}
                    <Link to={`/profiles/${profile.user._id}`}>
                      View Profile
                    </Link>
                  </Button>
                </div>
              </Card>
            </Zoom>
          ))
        : null}
    </div>
  );
};

export default Profiles;
