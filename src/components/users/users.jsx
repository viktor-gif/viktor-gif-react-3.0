import axios from "axios";
import React from "react";
import s from "./users.module.css";
import userAvatar from "../../img/ava.png";

const Users = (props) => {
  const getUsers = () => {
    if (props.users.length === 0) {
      axios
        .get("https://social-network.samuraijs.com/api/1.0/users")
        .then((response) => {
          props.getUsers(response.data.items);
        });
    }
  };

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

  return (
    <div>
      <button onClick={getUsers}>Get users</button>
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
