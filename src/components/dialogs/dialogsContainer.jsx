import { connect } from "react-redux";
import { addMessage } from "../../redux/dialogs-reducer";
import Dialogs from "./dialogs";
import withAuthRedirect from "../common/withAuthRedirect/withAuthRedirect";
import { compose } from "redux";

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage(messageText) {
      dispatch(addMessage(messageText));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
