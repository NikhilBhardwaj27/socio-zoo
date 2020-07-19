import React, { useState } from "react";
import "antd/dist/antd.css";
import "../auth/auth.css";
import { Form, Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  RocketTwoTone,
  MailOutlined,
} from "@ant-design/icons";
import { Link, Redirect } from "react-router-dom";
import { Card } from "antd";
import { connect } from "react-redux";
import { setMessage } from "../../redux/actions/message";
import Fade from "react-reveal/Fade";
import { registerRequest } from "../../redux/actions/auth";
import Loading from "../others/Loading";

const Register = (props) => {
  const { loading, isAuthenticated } = props.auth;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFinish = () => {
    if (password !== password2) {
      props.message("Password do not match", "error");
    } else {
      props.register(username, email, password);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/home-screen"></Redirect>;
  }

  return loading ? (
    <Loading></Loading>
  ) : (
    <div className="parent-register">
      <div className="child-register">
        <Fade left>
          <img
            src={require("../../assets/register-login.svg")}
            className="vector-image"
          ></img>
        </Fade>
        <Fade right>
          <Card
            title="Socio-Zoo"
            hoverable={true}
            bordered
            style={{ padding: "20px" }}
            extra={
              <Link to="/">
                <RocketTwoTone
                  style={{ fontSize: "48px" }}
                  twoToneColor="#8c00ff"
                />
              </Link>
            }
            bodyStyle={{ fontSize: "24px" }}
            headStyle={{ fontSize: "35px" }}
          >
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              size="large"
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  onChange={(e) => onChange(e)}
                  value={username}
                  name="username"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  onChange={(e) => onChange(e)}
                  value={email}
                  name="email"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  name="password"
                  onChange={(e) => onChange(e)}
                  value={password}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item
                name="password2"
                rules={[
                  {
                    required: true,
                    message: "Please input your Confirm Password!",
                  },
                ]}
              >
                <Input
                  name="password2"
                  onChange={(e) => onChange(e)}
                  value={password2}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Confirm Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ marginRight: "20px", backgroundColor: "#8c00ff" }}
                >
                  Register
                </Button>
                Or <Link to="/login">Login</Link>
              </Form.Item>
            </Form>
          </Card>
        </Fade>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    message: (text, messageType) => {
      dispatch(setMessage(text, messageType));
    },
    register: (username, email, password) => {
      dispatch(registerRequest(username, email, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
