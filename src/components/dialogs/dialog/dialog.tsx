import React from "react";
import { NavLink } from "react-router-dom";
import s from "./dialog.module.css";

type propsType = {
  id: number;
  name: string;
};

const Dialog: React.FC<propsType> = (props) => {
  return (
    <div className={s.contact}>
      <NavLink activeClassName={s.active} to={"/dialogs/" + props.id}>
        {props.name}
      </NavLink>
    </div>
  );
};

export default Dialog;
