import { Dispatch } from "redux";
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { appStateType, inferActionsTypes } from "./redux-store";
import { chatMessageType, chatAPI } from "../api/chat-api";

type statusType = "pending" | "ready";

let initialState = {
  messages: [] as chatMessageType[],
  status: "pending" as statusType,
};

const chatReducer = (
  state = initialState,
  action: actionsTypes
): initialStateType => {
  switch (action.type) {
    case "vgif/chat/MESSAGES_RECEIVED":
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };
    case "vgif/chat/STATUS_CHANGED":
      return {
        ...state,
        messages: [...state.messages, ...action.payload.status],
      };

    default:
      return state;
  }
};

export const actions = {
  messagesReceived: (messages: chatMessageType[]) =>
    ({
      type: "vgif/chat/MESSAGES_RECEIVED",
      payload: { messages },
    } as const),
  statusChanged: (status: statusType) =>
    ({
      type: "vgif/chat/STATUS_CHANGED",
      payload: { status },
    } as const),
};

let _newMessagehandler: ((messages: chatMessageType[]) => void) | null = null;
const newMessagehandlerCreator = (dispatch: dispatchType) => {
  if (_newMessagehandler === null) {
    _newMessagehandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessagehandler;
};
//redux-thunks
export const startMessagesListening = () => (dispatch: dispatchType) => {
  chatAPI.start();
  chatAPI.subscribe(newMessagehandlerCreator(dispatch));
};
export const stopMessagesListening = () => (dispatch: dispatchType) => {
  chatAPI.unsubscribe(newMessagehandlerCreator(dispatch));
  chatAPI.stop();
};
export const sendMessage = (message: string) => (dispatch: dispatchType) => {
  chatAPI.sendMessage(message);
};

export default chatReducer;

type initialStateType = typeof initialState;
type actionsTypes = inferActionsTypes<typeof actions>;

type dispatchType = Dispatch<actionsTypes>;
type thunkType = ThunkAction<
  void,
  appStateType,
  unknown,
  actionsTypes | ReturnType<typeof stopSubmit>
>;
