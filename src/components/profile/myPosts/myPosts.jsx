import React from "react";
import s from "./myPosts.module.css";
import Post from "./post/post";

const MyPosts = (props) => {
  const postsElements = props.posts.map((p) => (
    <Post key={p.id} id={p.id} post={p.post} likesCount={p.likesCount} />
  ));
  return <div className={s.myPosts}>{postsElements}</div>;
};

export default MyPosts;
