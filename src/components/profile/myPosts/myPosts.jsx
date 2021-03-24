import React from "react";
import s from "./myPosts.module.css";
import Post from "./post/post";

const MyPosts = (props) => {
  return (
    <div className={s.myPosts}>
      <Post post="hello!!!" />
      <Post post="I'm a cool developer" />
      <Post post="Hello world!!!!" />
      <Post post="Something" />
      <Post post="Something else" />
    </div>
  );
};

export default MyPosts;
