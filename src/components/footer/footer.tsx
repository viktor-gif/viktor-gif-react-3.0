import React from "react";
import s from "./footer.module.css";

type propsType = {};

const Footer: React.FC<propsType> = (props) => {
  return <div className={s.footer}>footer</div>;
};

export default Footer;
