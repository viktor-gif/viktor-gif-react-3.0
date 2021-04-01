import React from "react";
import s from "./users.module.css";
import userAvatar from "../../img/ava.png";

const Users = (props) => {
  const usersItems = props.users.map((u) => {
    return (
      <div key={u.id} className={s.user}>
        <div className={s.userPhoto}>
          <img src={u.photos.small ?? userAvatar} alt="photo" />
        </div>
        <div>
          {u.followed ? (
            <button onClick={() => props.unfollow(u.id)}>Unfollow</button>
          ) : (
            <button onClick={() => props.follow(u.id)}>Follow</button>
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

  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pagesArr = [];
  for (let i = 1; i <= pagesCount; i++) {
    pagesArr.push(i);
  }
  const pages = pagesArr.map((p) => {
    return (
      <span
        onClick={() => props.setCurrentPage(p)}
        className={props.selectedPage === p ? s.selectedPage : ""}
        key={p}
      >
        {p}
      </span>
    );
  });

  return (
    <div>
      <div className={s.pages}>{pages}</div>
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
