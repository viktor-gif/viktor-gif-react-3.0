import React from "react";
import s from "./post.module.css";

const Post = (props) => {
  return (
    <div className={s.post}>
      <div className={s.postImg}>
        <img src="https://blueocean-ventures.com/wp-content/uploads/2016/11/logo_ava.png" />
      </div>
      <div>{props.post}</div>
    </div>
  );
};

export default Post;
