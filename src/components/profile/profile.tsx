import React from "react";
import MyPostsContainer from "./myPosts/myPostsContainer";
import s from "./profile.module.css";
import ProfileInfoContainer from "./profileInfo/profileInfoContainer";

const Profile = () => {
  return (
    <div className={s.profile}>
      {/* @ts-ignore */}
      <ProfileInfoContainer />
      {/* @ts-ignore */}
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
