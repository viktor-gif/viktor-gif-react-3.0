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

  let messageText = props.dialogsPage.messageText;

  const onChangeMessageText = (e) => {
    props.updateMessageText(e.target.value);
  };

  const onSendMessage = () => {
    props.addMessage(messageText);
  };

  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.contacts}>{dialogsElements}</div>
        <div className={s.messages}>{messagesElements}</div>
      </div>
      <div className={s.formMessage}>
        <div>
          <textarea
            value={messageText}
            onChange={onChangeMessageText}
          ></textarea>
        </div>
        <div>
          <button onClick={onSendMessage}>Send message</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
