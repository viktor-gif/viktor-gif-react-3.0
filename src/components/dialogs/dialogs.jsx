import React from "react";
import Dialog from "./dialog/dialog";
import s from "./dialogs.module.css";
import Message from "./message/message";

const Dialogs = (props) => {
  const dialogsElements = props.dialogsPage.dialogs.map((d) => (
    <Dialog key={d.id} id={d.id} name={d.name} />
  ));

  const messagesElements = props.dialogsPage.messages.map((m) => (
    <Message key={m.id} id={m.id} message={m.message} />
  ));

  return (
    <div className={s.dialogs}>
      <div className={s.contacts}>{dialogsElements}</div>
      <div classname={s.messages}>{messagesElements}</div>
    </div>
  );
};

export default Dialogs;
