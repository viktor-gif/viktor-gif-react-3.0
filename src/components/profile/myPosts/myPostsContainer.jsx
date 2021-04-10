import { connect } from "react-redux";
import { addPost } from "../../../redux/profile-reducer";
import MyPosts from "./myPosts";

const mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost(newPostText) {
      dispatch(addPost(newPostText));
    },
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
