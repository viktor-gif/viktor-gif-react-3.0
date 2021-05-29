import React from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

type propsType = {
  isAuth: boolean;
  login: string | null;
  logout: () => void;
};

const Header: React.FC<propsType> = (props) => {
  return (
    <div className={s.header}>
      <img
        src="https://www.rnz.co.nz/assets/galleries/18311/full_Klim_metal_1.jpg?1444358671"
        alt="Klim"
      />
      {props.isAuth ? (
        <div className={s.loginBlock}>
          <span className={s.firstItemLoginBlock}>{props.login}</span>
          <button onClick={props.logout}>Log out</button>
        </div>
      ) : (
        <div className={s.loginBlock}>
          <NavLink to="/login">
            <button className={s.firstItemLoginBlock}>Log in</button>
          </NavLink>
          <button>Sign in</button>
        </div>
      )}
    </div>
  );
};

export default Header;
