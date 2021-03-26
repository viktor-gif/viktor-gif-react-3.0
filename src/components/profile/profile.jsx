import React from "react";
import MyPosts from "./myPosts/myPosts";
import s from "./profile.module.css";

const Profile = (props) => {
  const textareaField = React.createRef();

  const newPostText = props.profilePage.newPostText;

  const onPostChange = () => {
    props.changePost(textareaField.current.value);
  };

  const onAddPost = () => {
    props.addPost(textareaField.current.value);
  };

  return (
    <div className={s.profile}>
      <div>Ava</div>
      <div>Description</div>
      <div>
        <div>
          <div>
            <textarea
              onChange={onPostChange}
              value={newPostText}
              ref={textareaField}
            ></textarea>
          </div>
          <div>
            <button onClick={onAddPost}>Add post</button>
          </div>
        </div>
      </div>
      <div>
        My posts
        <MyPosts posts={props.profilePage.posts} />
      </div>
    </div>
  );
};

export default Profile;
