import React from "react";
import { Field, reduxForm } from "redux-form";
import s from "./myPosts.module.css";
import Post from "./post/post";

const MyPosts = (props) => {
  const postsElements = props.profilePage.posts.map((p) => (
    <Post key={p.id} id={p.id} post={p.post} likesCount={p.likesCount} />
  ));

  const submit = (values) => {
    props.addPost(values.postText);
  };
  return (
    <div className={s.myPosts}>
      <div>
        <PostReduxForm onSubmit={submit} />
      </div>
      <div>My posts</div>
      {postsElements}
    </div>
  );
};

const PostForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="postText"
          component="textarea"
          placeholder="New post"
        ></Field>
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const PostReduxForm = reduxForm({
  form: "postForm",
})(PostForm);

export default MyPosts;
