import React from "react";
import { addPost, updatePostText } from "../../../redux/profile-reducer";
import MyPosts from "./myPosts";

const MyPostsContainer = (props) => {
  const onUpdatePostText = (text) => {
    props.dispatch(updatePostText(text));
  };

  const onAddPost = (newPostText) => {
    props.dispatch(addPost(newPostText));
  };

  return (
    <MyPosts
      profilePage={props.profilePage}
      updatePostText={onUpdatePostText}
      addPost={onAddPost}
    />
  );
};

export default MyPostsContainer;
