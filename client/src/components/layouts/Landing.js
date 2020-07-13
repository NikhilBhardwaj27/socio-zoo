import React from "react";
import "../layouts/layout.css";
import { useSelector, useDispatch } from "react-redux";
import Roll from "react-reveal/Roll";
import Bounce from "react-reveal/Bounce";
import { Link, Redirect } from "react-router-dom";

const Landing = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/home-screen"></Redirect>;
  }
  return (
    <div className="wrapper">
      <div className="inner-wrapper">
        <Roll left cascade>
          <h1 className="heading1">Socio-Zoo</h1>
        </Roll>

        <Link to="/register">
          <a className="sign_up">Sign Up</a>
        </Link>

        <Link to="/login">
          <a className="login">Login</a>
        </Link>
        <Bounce left>
          <h1 className="heading2">
            A social-network platforms built by Nikhil Bhardwaj
          </h1>
        </Bounce>
      </div>
    </div>
  );
};

export default Landing;
