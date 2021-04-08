import { connect } from "react-redux";
import { addMessage, updateMessageText } from "../../redux/dialogs-reducer";
import Dialogs from "./dialogs";
import React from "react";
import withAuthRedirect from "../common/withAuthRedirect/withAuthRedirect";
import { compose } from "redux";

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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
