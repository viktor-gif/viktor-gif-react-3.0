import React from "react";
import { addPost, updatePostText } from "../../redux/profile-reducer";
import MyPostsContainer from "./myPosts/myPostsContainer";
import s from "./profile.module.css";
import ProfileInfo from "./profileInfo/profileInfo";

const Profile = (props) => {
  return (
    <div className={s.profile}>
      <ProfileInfo />

      <MyPostsContainer />
    </div>
  );
};

export default Profile;
