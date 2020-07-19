import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "../auth/auth.css";
import { Form, Input, Button } from "antd";
import { LockOutlined, RocketTwoTone, MailOutlined } from "@ant-design/icons";
import { Link, Redirect } from "react-router-dom";
import { Card } from "antd";
import Fade from "react-reveal/Fade";
import { loginRequest } from "../../redux/actions/auth";
import { connect } from "react-redux";
import Loading from "../others/Loading";

const Login = (props) => {
  const { loading, isAuthenticated } = props.auth;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFinish = () => {
    props.login(email, password);
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
            style={{ padding: "20px" }}
            bordered
            extra={
              <Link to="/">
                <RocketTwoTone
                  style={{ fontSize: "48px" }}
                  twoToneColor="#8c00ff"
                />
              </Link>
            }
            className="card-style"
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

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ marginRight: "20px", backgroundColor: "#8c00ff" }}
                >
                  Login
                </Button>
                Or <Link to="/register">Register</Link>
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
    login: (email, password) => {
      dispatch(loginRequest(email, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
