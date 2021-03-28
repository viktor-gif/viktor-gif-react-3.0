import React from "react";
import { addMessage, updateMessageText } from "../../redux/dialogs-reducer";
import Dialogs from "./dialogs";

const DialogsContainer = (props) => {
  const onChangeMessageText = (text) => {
    props.dispatch(updateMessageText(text));
  };

  const onSendMessage = (messageText) => {
    props.dispatch(addMessage(messageText));
  };

  return (
    <Dialogs
      dialogsPage={props.dialogsPage}
      updateMessageText={onChangeMessageText}
      addMessage={onSendMessage}
    />
  );
};

export default DialogsContainer;
