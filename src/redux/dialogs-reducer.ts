const ADD_MESSAGE = "vgif/dialogs/ADD_MESSAGE";

type initialStateType = {
  dialogs: Array<dialogsType>;
  messages: Array<messagesType>;
};
type messagesType = { id: number; message: string };
type dialogsType = { id: number; name: string };
const initialState = {
  dialogs: [
    { id: 1, name: "Youlia" },
    { id: 2, name: "Olia" },
    { id: 3, name: "Vitiok" },
  ],
  messages: [
    { id: 1, message: "Hello! What's app?" },
    { id: 2, message: "Okey, and you?" },
    { id: 3, message: "I'm ok, let's go to walk!" },
  ],
};

const dialogsReducer = (
  state = initialState,
  action: actionsTypes
): initialStateType => {
  switch (action.type) {
    case ADD_MESSAGE:
      let newMessage = {
        id: state.messages.length + 1,
        message: action.message,
      };
      return {
        ...state,
        messages: [...state.messages, newMessage],
        // messageText: "",
      };

    default:
      return state;
  }
};

type actionsTypes = addMessageType;

type addMessageType = {
  type: typeof ADD_MESSAGE;
  message: string;
};
export const addMessage = (message: string): addMessageType => ({
  type: ADD_MESSAGE,
  message,
});

export default dialogsReducer;
