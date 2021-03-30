import React from "react";
import s from "./users.module.css";

const Users = (props) => {
  if (props.users.length === 0) {
    props.getUsers([
      {
        id: 1,
        imgUrl:
          "https://wikicomics.ru/uploads/posts/2015-09/1442533395_doktor-dum-v-filme-fantasticheskaya-chetverka-2005-goda.jpg",
        followed: false,
        name: "Viktor",
        status: "Hello",
        location: { country: "Ukraine", city: "Kyev" },
      },
      {
        id: 2,
        imgUrl:
          "https://wikicomics.ru/uploads/posts/2015-09/1442533395_doktor-dum-v-filme-fantasticheskaya-chetverka-2005-goda.jpg",
        followed: true,
        name: "Dima",
        status: "I'm a cool developer",
        location: { country: "Belarus", city: "Minsk" },
      },
      {
        id: 3,
        imgUrl:
          "https://wikicomics.ru/uploads/posts/2015-09/1442533395_doktor-dum-v-filme-fantasticheskaya-chetverka-2005-goda.jpg",
        followed: false,
        name: "Vova",
        status: "Hello world!!!!",
        location: { country: "Russia", city: "Moskov" },
      },
    ]);
  }

  const usersItems = props.users.map((u) => {
    return (
      <div key={u.id} className={s.user}>
        <div className={s.userPhoto}>
          <img src={u.imgUrl} alt="photo" />
        </div>
        <div>
          {u.followed ? (
            <button onClick={() => props.unfollow(u.id)}>Unfollow</button>
          ) : (
            <button onClick={() => props.follow(u.id)}>Follow</button>
          )}
        </div>
        <div>{u.name}</div>
        <div>{u.status}</div>
        <div>{u.country}</div>
        <div>{u.city}</div>
      </div>
    );
  });

  return <div>{usersItems}</div>;
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
