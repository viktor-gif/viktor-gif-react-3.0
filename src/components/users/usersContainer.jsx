import React from "react";
import { connect } from "react-redux";
import {
  requestUsers,
  follow,
  unfollow,
  setCurrentPage,
  setTotalUsersCount,
  setToggleFetching,
  toggleFollowingProgress,
} from "../../redux/users-reducer";
import Users from "./users";
import Preloader from "../common/preloader/preloader";
import {
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getSelectedPage,
  getTotalUsersCount,
  getUsers,
} from "../../redux/selectors/user-selectors";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.requestUsers(this.props.selectedPage, this.props.pageSize);
  }

  setCurrentPage = (currentPage) => {
    this.props.setCurrentPage(currentPage);
    this.props.requestUsers(currentPage, this.props.pageSize);
  };

  follow = (userId) => {
    this.props.follow(userId);
  };
  unfollow = (userId) => {
    this.props.unfollow(userId);
  };

  render() {
    console.log("render");
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
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    selectedPage: getSelectedPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default connect(mapStateToProps, {
  requestUsers,
  follow,
  unfollow,
  setCurrentPage,
  setTotalUsersCount,
  setToggleFetching,
  toggleFollowingProgress,
})(UsersContainer);
