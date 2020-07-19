import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../redux/actions/post";
import Loading from "../others/Loading";
import PostsItems from "./pages/PostsItems";

const HomeScreen = () => {
  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);
  const userId = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return loading ? (
    <Loading></Loading>
  ) : (
    <h1>
      {posts && userId != null ? (
        posts.map((post) => (
          <PostsItems post={post} userId={userId.id}></PostsItems>
        ))
      ) : (
        <h1>Not Post found</h1>
      )}
    </h1>
  );
};

export default HomeScreen;
