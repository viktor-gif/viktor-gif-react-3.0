import React from "react";
import s from "./users.module.css";
import userAvatar from "../../img/ava.png";
import { NavLink } from "react-router-dom";
import Paginator from "../common/paginator/paginator";
import { userType } from "../../Types";

type propsType = {
  users: Array<userType>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  followingInProgress: Array<number>;
  totalUsersCount: number;
  pageSize: number;
  selectedPage: number;
  setCurrentPage: (pageNumber: number) => void;
};

const Users: React.FC<propsType> = (props) => {
  const usersItems = props.users.map((u) => {
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
              disabled={props.followingInProgress.some((id) => id === u.id)}
              onClick={() => props.unfollow(u.id)}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={props.followingInProgress.some((id) => id === u.id)}
              onClick={() => props.follow(u.id)}
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
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        selectedPage={props.selectedPage}
        setCurrentPage={props.setCurrentPage}
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

export default Users;
