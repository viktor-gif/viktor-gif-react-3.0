import React from "react";
import { NavLink } from "react-router-dom";
import s from "./navbar.module.css";

type propsType = {};

const Navbar: React.FC<propsType> = (props) => {
  return (
    <nav className={s.navbar}>
      <div className={s.item}>
        <NavLink activeClassName={s.active} to="/profile">
          profile
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink activeClassName={s.active} to="dialogs">
          dialogs
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink activeClassName={s.active} to="users">
          users
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink activeClassName={s.active} to="chat">
          chat
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink activeClassName={s.active} to="news">
          news
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink activeClassName={s.active} to="music">
          music
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
