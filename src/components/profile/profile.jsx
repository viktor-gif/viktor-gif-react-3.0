import React from "react";
import MyPosts from "./myPosts/myPosts";
import s from "./profile.module.css";

const Profile = (props) => {
  return (
    <div className={s.profile}>
      <div className={s.profileWrapper}>
        <div>Ava</div>
        <div>Description</div>
        <div>
          My posts
          <MyPosts />
        </div>
      </div>
    </div>
  );
};

export default Profile;
