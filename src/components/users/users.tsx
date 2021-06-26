import React, { useEffect } from "react";
import s from "./users.module.css";
import userAvatar from "../../img/ava.png";
import { NavLink } from "react-router-dom";
import Paginator from "../common/paginator/paginator";
import {
  filterType,
  requestUsers,
  setCurrentPage,
  follow,
  unfollow,
} from "../../redux/users-reducer";
import {
  getFollowingInProgress,
  getPageSize,
  getSelectedPage,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from "../../redux/selectors/user-selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

type propsType = {};

export const Users: React.FC<propsType> = (props) => {
  const users = useSelector(getUsers);
  const followingInProgress = useSelector(getFollowingInProgress);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const pageSize = useSelector(getPageSize);
  const selectedPage = useSelector(getSelectedPage);
  const filter = useSelector(getUsersFilter);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    history.push({
      pathname: "/users",
      search: `?term=${filter.term}&friend=${filter.friend}&page=${selectedPage}`,
    });
  }, [filter, selectedPage]);

  useEffect(() => {
    dispatch(requestUsers(selectedPage, pageSize, filter));
  }, []);

  const onPageChanged = (currentPage: number) => {
    dispatch(setCurrentPage(currentPage));
    dispatch(requestUsers(currentPage, pageSize, filter));
  };

  const onFilterChanged = (filter: filterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };

  const wrapFollow = (userId: number) => {
    dispatch(follow(userId));
  };
  const wrapUnfollow = (userId: number) => {
    dispatch(unfollow(userId));
  };

  const usersItems = users.map((u) => {
    return (
      <div key={u.id} className={s.user}>
        <div className={s.userPhoto}>
          <NavLink to={"/profile/" + u.id}>
            <img src={u.photos.small ?? userAvatar} alt="user-ava" />
          </NavLink>
        </div>
        <div>
          {u.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === u.id)}
              onClick={() => wrapUnfollow(u.id)}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === u.id)}
              onClick={() => wrapFollow(u.id)}
            >
              Follow
            </button>
          )}
        </div>
        <div>
          <b>Name</b> :{u.name}
        </div>
        <div>
          <b>Status</b> :{u.status ?? "--------"}
        </div>
        <div>u.country</div>
        <div>u.city</div>
      </div>
    );
  });

  return (
    <div>
      <Paginator
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        selectedPage={selectedPage}
        setCurrentPage={onPageChanged}
        onFilterChanged={onFilterChanged}
      />
      {usersItems}
    </div>
  );
};

// const User = (props) => {
//   const follow = () => {
//     debugger;
//     props.follow(props.id);
//   };
//   const unfollow = () => {
//     props.unfollow(props.id);
//   };
