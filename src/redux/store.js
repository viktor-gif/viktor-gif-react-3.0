import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

const store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, post: "Hello", likesCount: 5 },
        { id: 2, post: "I'm a cool developer", likesCount: 23 },
        { id: 3, post: "Hello world!!!!", likesCount: 0 },
      ],
      newPostText: "",
    },
    dialogsPage: {
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
      messageText: "",
    },
  },
  getState() {
    return this._state;
  },
  _callSubscriber() {
    alert("state is changed");
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._callSubscriber();
  },
};

export default store;
