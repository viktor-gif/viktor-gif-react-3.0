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
import { usersAPI } from "../../api/api";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.setToggleFetching(true);

    usersAPI
      .getUsers(this.props.selectedPage, this.props.pageSize)
      .then((response) => {
        this.props.setToggleFetching(false);

        this.props.getUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }

  setCurrentPage = (currentPage) => {
    this.props.setCurrentPage(currentPage);
    this.props.setToggleFetching(true);
    usersAPI.getUsers(currentPage, this.props.pageSize).then((response) => {
      this.props.setToggleFetching(false);
      this.props.getUsers(response.data.items);
    });
  };

  follow = (userId) => {
    this.props.toggleFollowingProgress([userId]);
    usersAPI.follow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        this.props.follow(userId);
      }
      this.props.toggleFollowingProgress([false]);
    });
  };
  unfollow = (userId) => {
    this.props.toggleFollowingProgress([userId]);
    usersAPI.unfollow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        this.props.unfollow(userId);
      }
      this.props.toggleFollowingProgress([false]);
    });
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
