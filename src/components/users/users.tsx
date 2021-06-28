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
import * as queryString from "querystring";

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

  type queryParamsType = {
    term?: string;
    page?: string;
    friend?: string;
  };

  useEffect(() => {
    const parsed = queryString.parse(
      history.location.search.substr(1)
    ) as queryParamsType;

    let actualPage = selectedPage;
    let actualFilter = filter;

    if (!!parsed.page) actualPage = Number(parsed.page);
    if (!!parsed.term)
      actualFilter = { ...actualFilter, term: parsed.term as string };
    switch (parsed.friend) {
      case "null":
        actualFilter = { ...actualFilter, friend: null };
        break;
      case "true":
        actualFilter = { ...actualFilter, friend: true };
        break;
      case "false":
        actualFilter = { ...actualFilter, friend: false };
        break;
    }

    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    const query: queryParamsType = {};
    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (selectedPage !== 1) query.page = String(selectedPage);

    history.push({
      pathname: "/users",
      search: queryString.stringify(query),
    });
  }, [filter, selectedPage]);

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
