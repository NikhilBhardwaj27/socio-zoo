import React, { useState, useEffect } from "react";
import "../profile.css";
import Slide from "react-reveal/Slide";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfileRequest } from "../../../redux/actions/profile";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  Card,
  Avatar,
  Radio,
  Select,
  InputNumber,
} from "antd";
import { createProfile } from "../../../redux/actions/profile";
const { Meta } = Card;

const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const editProfile = useSelector((state) => state.profile.editProfile);
  const dispatch = useDispatch();

  const { username, avatar, id } = user;
  const [formData, setFormData] = useState({
    bio: "",
    relationshipStatus: "",
    birthday: "",
    location: "",
    website: "",
    gender: "",
    age: "",
    hobbies: "",
    youtube: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  });

  const {
    bio,
    relationshipStatus,
    birthday,
    location,
    website,
    gender,
    age,
    hobbies,
    youtube,
    linkedin,
    twitter,
    instagram,
  } = formData;

  useEffect(() => {
    dispatch(getProfileRequest(id));
    if (profile) {
      setFormData({
        bio: loading || !profile.bio ? "" : profile.bio,
        relationshipStatus:
          loading || !profile.relationshipStatus
            ? ""
            : profile.relationshipStatus,
        location: loading || !profile.location ? "" : profile.location,
        website: loading || !profile.website ? "" : profile.website,
        gender: loading || !profile.gender ? "" : profile.gender,
        age: loading || !profile.age ? "" : profile.age,
        hobbies: loading || !profile.hobbies ? "" : profile.hobbies,
        youtube: loading || !profile.social ? "" : profile.social.youtube,
        instagram: loading || !profile.social ? "" : profile.social.instagram,
        linkedin: loading || !profile.social ? "" : profile.social.linkedin,
        twitter: loading || !profile.social ? "" : profile.social.twitter,
      });
    }
  }, [editProfile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFinish = () => {
    dispatch(createProfile(formData));
  };

  return (
    <div className="container">
      <Slide top>
        <Card
          hoverable={true}
          className="view-profile-card"
          style={{ marginBottom: "50px" }}
        >
          <Meta
            avatar={<Avatar src={avatar} size="large" />}
            title={username}
            description="Welcome to profile update dashboard."
          />
          <Form size="default" className="profile-form" onFinish={onFinish}>
            <Form.Item label="Bio">
              <Input name="bio" value={bio} onChange={(e) => handleChange(e)} />
            </Form.Item>
            <Form.Item label="Relationship">
              <Select
                name="relationshipStatus"
                value={relationshipStatus}
                onChange={(e) =>
                  setFormData({ ...formData, relationshipStatus: e })
                }
              >
                <Select.Option value={"Married"}>Married</Select.Option>
                <Select.Option value={"Single"}>Single</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Gender">
              <Radio.Group
                name="gender"
                value={gender}
                onChange={(e) => handleChange(e)}
              >
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
                <Radio value="Others">Others</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Location">
              <Input
                name="location"
                value={location}
                onChange={(e) => handleChange(e)}
              />
            </Form.Item>
            <Form.Item label="Website">
              <Input
                name="website"
                value={website}
                onChange={(e) => handleChange(e)}
              />
            </Form.Item>
            <Form.Item label="instagram">
              <Input
                name="instagram"
                value={instagram}
                onChange={(e) => handleChange(e)}
              />
            </Form.Item>
            <Form.Item label="youtube">
              <Input
                name="youtube"
                value={youtube}
                onChange={(e) => handleChange(e)}
              />
            </Form.Item>
            <Form.Item label="linkedin">
              <Input
                name="linkedin"
                value={linkedin}
                onChange={(e) => handleChange(e)}
              />
            </Form.Item>
            <Form.Item label="twitter">
              <Input
                name="twitter"
                value={twitter}
                onChange={(e) => handleChange(e)}
              />
            </Form.Item>
            <Form.Item label="Age">
              <InputNumber
                min={3}
                max={80}
                name="age"
                value={age}
                onChange={(e) => setFormData({ ...formData, age: e })}
              />
            </Form.Item>
            <Form.Item label="Hobbies">
              <Input
                name="hobbies"
                value={hobbies}
                onChange={(e) => handleChange(e)}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Submit</Button>
            </Form.Item>

            <Form.Item>
              <Link to="/profile">Go Back</Link>
            </Form.Item>
          </Form>
        </Card>
      </Slide>
    </div>
  );
};

export default EditProfile;
