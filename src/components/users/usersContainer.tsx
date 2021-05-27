import React from "react";
import { connect } from "react-redux";
import {
  requestUsers,
  follow,
  unfollow,
  setCurrentPage,
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
import { userType } from "../../Types";
import { appStateType } from "../../redux/redux-store";
import { compose } from "redux";

type mapStatePropsType = {
  pageSize: number;
  selectedPage: number;
  isFetching: boolean;
  totalUsersCount: number;
  users: Array<userType>;
  followingInProgress: Array<number>;
};
type mapDispatchPropsType = {
  requestUsers: (currentPage: number, pageSize: number) => void;
  setCurrentPage: (currentPage: number) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};
type ownPropsType = {};

type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType;

class UsersContainer extends React.Component<propsType> {
  componentDidMount() {
    this.props.requestUsers(this.props.selectedPage, this.props.pageSize);
  }

  setCurrentPage = (currentPage: number) => {
    this.props.setCurrentPage(currentPage);
    this.props.requestUsers(currentPage, this.props.pageSize);
  };

  follow = (userId: number) => {
    this.props.follow(userId);
  };
  unfollow = (userId: number) => {
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

const mapStateToProps = (state: appStateType): mapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    selectedPage: getSelectedPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, appStateType>(
    mapStateToProps,
    {
      requestUsers,
      follow,
      unfollow,
      setCurrentPage,
    }
  )
)(UsersContainer);
