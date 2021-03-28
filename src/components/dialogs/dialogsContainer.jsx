import React from "react";
import { connect } from "react-redux";
import { addMessage, updateMessageText } from "../../redux/dialogs-reducer";
import Dialogs from "./dialogs";

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessageText(text) {
      dispatch(updateMessageText(text));
    },
    addMessage(messageText) {
      dispatch(addMessage(messageText));
    },
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
