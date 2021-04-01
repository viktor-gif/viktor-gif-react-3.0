import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  getUsers,
  follow,
  unfollow,
  setCurrentPage,
  setTotalUsersCount,
  setToggleFetching,
} from "../../redux/users-reducer";
import Users from "./users";
import Preloader from "../common/preloader/preloader";

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    selectedPage: state.usersPage.selectedPage,
    isFetching: state.usersPage.isFetching,
  };
};

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.setToggleFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.selectedPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setToggleFetching(false);
        this.props.getUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }

  setCurrentPage = (currentPage) => {
    this.props.setCurrentPage(currentPage);
    this.props.setToggleFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setToggleFetching(false);
        this.props.getUsers(response.data.items);
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
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          setCurrentPage={this.setCurrentPage}
        />
      </>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getUsers(users) {
//       dispatch(getUsers(users));
//     },
//     follow(userId) {
//       dispatch(follow(userId));
//     },
//     unfollow(userId) {
//       dispatch(unfollow(userId));
//     },
//     setCurrentPage(currentPage) {
//       dispatch(setCurrentPage(currentPage));
//     },
//     setTotalUsersCount(usersCount) {
//       dispatch(setTotalUsersCount(usersCount));
//     },
//     setToggleFetching(isFetching) {
//       dispatch(setToggleFetching(isFetching));
//     },
//   };
// };

export default connect(mapStateToProps, {
  getUsers,
  follow,
  unfollow,
  setCurrentPage,
  setTotalUsersCount,
  setToggleFetching,
})(UsersContainer);
