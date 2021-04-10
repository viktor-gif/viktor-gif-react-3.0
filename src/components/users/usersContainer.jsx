import React from "react";
import { connect } from "react-redux";
import {
  getUsers,
  follow,
  unfollow,
  setCurrentPage,
  setTotalUsersCount,
  setToggleFetching,
  toggleFollowingProgress,
} from "../../redux/users-reducer";
import Users from "./users";
import Preloader from "../common/preloader/preloader";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.selectedPage, this.props.pageSize);
  }

  setCurrentPage = (currentPage) => {
    this.props.setCurrentPage(currentPage);
    this.props.getUsers(currentPage, this.props.pageSize);
  };

  follow = (userId) => {
    this.props.follow(userId);
  };
  unfollow = (userId) => {
    this.props.unfollow(userId);
  };

  render() {
    return (
      <>
        {this.props.isFetching && <Preloader />}
        <Users
          users={this.props.users}
          pageSize={this.props.pageSize}
          totalUsersCount={this.props.totalUsersCount}
          selectedPage={this.props.selectedPage}
          follow={this.follow}
          unfollow={this.unfollow}
          setCurrentPage={this.setCurrentPage}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    selectedPage: state.usersPage.selectedPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
};

export default connect(mapStateToProps, {
  getUsers,
  follow,
  unfollow,
  setCurrentPage,
  setTotalUsersCount,
  setToggleFetching,
  toggleFollowingProgress,
})(UsersContainer);
