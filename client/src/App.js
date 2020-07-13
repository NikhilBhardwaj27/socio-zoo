import React, { Fragment, useEffect } from "react";
import Landing from "./components/layouts/Landing";
import Navbar from "./components/layouts/Navbar";
import PrivateRoute from './components/routing/PrivateRoute'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Message from "../src/components/layouts/Message";
import setToken from "../src/utils/setToken";
import { USER_LOAD } from "./redux/actions/types";
import MyPost from "../src/components/posts/MyPost";
import Loading from "./components/others/Loading";
import HomeScreen from "./components/posts/HomeScreen";
import Profile from "./components/profile/Profile";

const App = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile)
  const dispatch = useDispatch();

  if (localStorage.token) {
    setToken(localStorage.token);
  }

  useEffect(() => {
    dispatch({ type: USER_LOAD });
  }, []);

  return (
    <Fragment>
      <Router>
        {auth.isAuthenticated ? <Navbar></Navbar> : null}
        <Message />
        <Loading></Loading>
        <Switch>
          <Route path="/" component={Landing} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
          <PrivateRoute path="/home-screen" component={HomeScreen} exact />
          <PrivateRoute path="/profile" component={Profile} exact />
        </Switch>
      </Router>
    </Fragment>
  );
};



export default App;
