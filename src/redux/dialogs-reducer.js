const ADD_MESSAGE = "ADD_MESSAGE";

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

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      let newMessage = {
        id: state.messages.length + 1,
        message: action.message,
      };
      return {
        ...state,
        messages: [...state.messages, newMessage],
        messageText: "",
      };

    default:
      return state;
  }
};

export const addMessage = (message) => ({ type: ADD_MESSAGE, message });

export default dialogsReducer;
