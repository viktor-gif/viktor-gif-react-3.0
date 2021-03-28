import React from "react";
import s from "./myPosts.module.css";
import Post from "./post/post";

const MyPosts = (props) => {
  const postsElements = props.profilePage.posts.map((p) => (
    <Post key={p.id} id={p.id} post={p.post} likesCount={p.likesCount} />
  ));

  const textareaField = React.createRef();
  const newPostText = props.profilePage.newPostText;

  const onPostChange = () => {
    let text = textareaField.current.value;
    props.updatePostText(text);
  };

  const onAddPost = () => {
    props.addPost(newPostText);
  };

  return (
    <div className={s.myPosts}>
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
      <div>My posts</div>
      {postsElements}
    </div>
  );
};

export default MyPosts;
