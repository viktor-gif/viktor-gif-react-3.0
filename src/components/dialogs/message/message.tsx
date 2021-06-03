import React from "react";
import s from "./message.module.css";

type propsType = {
  message: string;
  id: number;
};

const Message: React.FC<propsType> = (props) => {
  return <div className={s.message}>{props.message}</div>;
};

export default Message;
