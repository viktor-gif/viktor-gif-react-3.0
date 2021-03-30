import axios from "axios";
import React from "react";
import s from "./users.module.css";
import userAvatar from "../../img/ava.png";

class Users extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios
      .get("https://social-network.samuraijs.com/api/1.0/users")
      .then((response) => {
        this.props.getUsers(response.data.items);
      });
  }

  render() {
    const usersItems = this.props.users.map((u) => {
      return (
        <div key={u.id} className={s.user}>
          <div className={s.userPhoto}>
            <img src={u.photos.small ?? userAvatar} alt="photo" />
          </div>
          <div>
            {u.followed ? (
              <button onClick={() => this.props.unfollow(u.id)}>
                Unfollow
              </button>
            ) : (
              <button onClick={() => this.props.follow(u.id)}>Follow</button>
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
    return <div>{usersItems}</div>;
  }
}

// const User = (props) => {
//   const follow = () => {
//     debugger;
//     props.follow(props.id);
//   };
//   const unfollow = () => {
//     props.unfollow(props.id);
//   };

export default Users;
