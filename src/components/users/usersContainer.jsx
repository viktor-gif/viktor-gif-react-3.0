import React from "react";
import { connect } from "react-redux";
import {
  setUsers,
  follow,
  unfollow,
  setCurrentPage,
  setTotalUsersCount,
} from "../../redux/users-reducer";
import Users from "./users";

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    selectedPage: state.usersPage.selectedPage,
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
    getCurrentPage(currentPage) {
      dispatch(setCurrentPage(currentPage));
    },
    getTotalUsersCount(usersCount) {
      dispatch(setTotalUsersCount(usersCount));
    },
  };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;
