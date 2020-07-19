import React, { Fragment, useEffect } from "react";
import Landing from "./components/layouts/Landing";
import Navbar from "./components/layouts/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Message from "../src/components/layouts/Message";
import setToken from "../src/utils/setToken";
import Profiles from '../src/components/profiles/Profiles'
import { USER_LOAD } from "./redux/actions/types";
import MyPost from "../src/components/posts/MyPost";
import HomeScreen from "./components/posts/HomeScreen";
import Profile from "./components/profile/Profile";
import EditProfile from './components/profile/profile-forms/EditProfile'
import NotFound from "./components/others/404";
import ProfilesItems from "./components/profiles/ProfilesItems";


const App = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
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
        <Switch>
          <Route path="/" component={Landing} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
          {auth.isAuthenticated ? (
            <>
              <Switch>
                <Route path="/home-screen" component={HomeScreen} exact />
                <Route path="/my-posts" component={MyPost} exact />
                <Route path="/profile" component={Profile} exact />
                <Route path="/profiles/:id" component={ProfilesItems} exact/>
                <Route path="/users" component={Profiles} exact />
                <Route path="/edit-profile" component={EditProfile} exact></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </>
          ) : null}
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
