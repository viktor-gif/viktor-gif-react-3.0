import React from "react";
import s from "./post.module.css";

const Post = (props) => {
  return (
    <div className={s.post}>
      <div className={s.postImg}>
        <img
          src="https://itc.ua/wp-content/uploads/2021/02/screen_shot_2020_07_21_at_9.38.25_am.0.png"
          alt="avatar"
        />
      </div>
      <div>{props.post}</div>
      <div className={s.likes}>Likes: {props.likesCount}</div>
    </div>
  );
};

export default Post;
