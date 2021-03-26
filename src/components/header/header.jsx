import React from "react";
import s from "./header.module.css";

const Header = (props) => {
  return (
    <div className={s.header}>
      <img
        src="https://www.rnz.co.nz/assets/galleries/18311/full_Klim_metal_1.jpg?1444358671"
        alt="Klim"
      />
    </div>
  );
};

export default Header;
