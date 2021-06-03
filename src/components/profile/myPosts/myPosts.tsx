import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../validators/validators";
import { Textarea } from "../../common/formControls/formControls";
import s from "./myPosts.module.css";
import { postType } from "./myPostsContainer";
import Post from "./post/post";

type myPostsPropsType = {
  posts: Array<postType>;

  addPost: (newPost: string) => void;
  deletePost: (id: number) => void;
};

const MyPosts: React.FC<myPostsPropsType> = (props) => {
  const postsElements = [...props.posts]
    .reverse()
    .map((p) => (
      <Post
        key={p.id}
        id={p.id}
        post={p.post}
        likesCount={p.likesCount}
        deletePost={props.deletePost}
      />
    ));

  const submit = (values: postFormValuesType) => {
    props.addPost(values.postText);
  };

  return (
    <div className={s.myPosts}>
      <div className={s.myPostsTitle}>My posts</div>
      <div>
        <PostReduxForm onSubmit={submit} />
      </div>
      {postsElements}
    </div>
  );
};

const maxLength10 = maxLengthCreator(10);

type postFormValuesType = {
  postText: string;
};

const PostForm: React.FC<InjectedFormProps<postFormValuesType>> = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="postText"
          component={Textarea}
          placeholder="New post"
          validate={[required, maxLength10]}
        ></Field>
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const PostReduxForm = reduxForm<postFormValuesType>({
  form: "postForm",
})(PostForm);

export default MyPosts;
