import { connect } from "react-redux";
import { addPost, updatePostText } from "../../../redux/profile-reducer";
import MyPosts from "./myPosts";

const mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePostText(text) {
      dispatch(updatePostText(text));
    },
    addPost(newPostText) {
      dispatch(addPost(newPostText));
    },
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
