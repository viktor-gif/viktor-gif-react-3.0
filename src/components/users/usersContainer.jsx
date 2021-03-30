import React from "react";
import { connect } from "react-redux";
import { setUsers, follow, unfollow } from "../../redux/users-reducer";
import Users from "./users";

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers(users) {
      dispatch(setUsers(users));
    },
    follow(userId) {
      dispatch(follow(userId));
    },
    unfollow(userId) {
      dispatch(unfollow(userId));
    },
  };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;
