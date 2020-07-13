import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "antd";
import { Link, Redirect } from "react-router-dom";
import { LOGOUT } from "../../redux/actions/types";
import "antd/dist/antd.css";
import { Avatar } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  ThunderboltOutlined,
  MenuFoldOutlined,
  TeamOutlined,
} from "@ant-design/icons";
const { SubMenu } = Menu;

const Navbar = () => {
  let name="",avatar="";
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch();

  if(user){
    name = user.username
    avatar = user.avatar
  }
  return (
    <div>
      <Menu
        mode="horizontal"
        overflowedIndicator={<MenuFoldOutlined style={icon_size} />}
        style={Menu_Style}
      >
        <Menu.Item key="home" icon={<HomeOutlined style={icon_size} />}>
          <Link to="/home-screen"> Home</Link>
        </Menu.Item>
        <Menu.Item
          key="my-post"
          icon={<ThunderboltOutlined style={icon_size} />}
        >
          <Link to="/my-posts"> My Posts</Link>
        </Menu.Item>
        <Menu.Item key="users" icon={<TeamOutlined style={icon_size} />}>
          Users
        </Menu.Item>
        <SubMenu icon={<UserOutlined style={icon_size} />} title="Profile">
          <Menu.ItemGroup title="Sub Menu">
            <Menu.Item
              key="my-profile"
              icon={
                <Avatar src={avatar} />}
            >
              <Link to="/profile">{ " "+name}</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined style={icon_size} />}>
              <Link
                to="/"
                onClick={() => {
                  dispatch({ type: LOGOUT });
                }}
              >
                Logout
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </div>
  );
};

const Menu_Style = {
  display: "flex",
  marginTop: "10px",
  justifyContent: "space-around",
  fontSize: "18px",
};

const icon_size = {
  fontSize: "20px",
};

export default Navbar;
