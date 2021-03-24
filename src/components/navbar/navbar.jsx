import React from "react";
import s from "./navbar.module.css";

const Navbar = (props) => {
  return (
    <nav className={s.navbar}>
      <div>profile</div>
      <div>dialogs</div>
      <div>users</div>
      <div>news</div>
      <div>music</div>
    </nav>
  );
};

export default Navbar;
