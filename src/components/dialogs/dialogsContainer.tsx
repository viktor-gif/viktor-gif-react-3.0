import { connect } from "react-redux";
import { addMessage } from "../../redux/dialogs-reducer";
import Dialogs from "./dialogs";
import withAuthRedirect from "../common/withAuthRedirect/withAuthRedirect";
import { compose } from "redux";
import { appStateType } from "../../redux/redux-store";

type dialogType = {
  id: number;
  name: string;
};
type messageType = {
  id: number;
  message: string;
};

type mapStatePropsType = {
  dialogs: Array<dialogType>;
  messages: Array<messageType>;
};

type mapDispatchPropsType = {
  addMessage: (newMessageText: string) => void;
};

type propsType = mapStatePropsType & mapDispatchPropsType;

const mapStateToProps = (state: appStateType): mapStatePropsType => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addMessage(messageText: string) {
//       dispatch(addMessage(messageText));
//     },
//   };
// };

export default compose(
  connect<mapStatePropsType, mapDispatchPropsType, propsType, appStateType>(
    mapStateToProps,
    { addMessage }
  ),
  withAuthRedirect
)(Dialogs);
