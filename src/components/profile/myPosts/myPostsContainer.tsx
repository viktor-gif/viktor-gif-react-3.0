import { connect } from "react-redux";
import { compose } from "redux";
import { addPost, deletePost } from "../../../redux/profile-reducer";
import { appStateType } from "../../../redux/redux-store";
import MyPosts from "./myPosts";

export type postType = {
  id: number;
  post: string;
  likesCount: number;
};

type mapStatePropsType = {
  posts: Array<postType>;
};

type mapDispatchPropsType = {
  addPost: (newPost: string) => void;
  deletePost: (id: number) => void;
};

type propsType = mapStatePropsType & mapDispatchPropsType;

const mapStateToProps = (state: appStateType): mapStatePropsType => {
  return {
    posts: state.profilePage.posts,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addPost(newPostText) {
//       dispatch(addPost(newPostText));
//     },
//     deletePost(id) {
//       dispatch(deletePost(id));
//     },
//   };
// };
export default compose(
  connect<mapStatePropsType, mapDispatchPropsType, propsType, appStateType>(
    mapStateToProps,
    { addPost, deletePost }
  )
)(MyPosts);

// export default MyPostsContainer;
// export default compose(
//   connect<mapStatePropsType, mapDispatchPropsType, propsType, appStateType>(
//     mapStateToProps,
//     { addMessage }
//   ),
//   withAuthRedirect
// )(Dialogs);
