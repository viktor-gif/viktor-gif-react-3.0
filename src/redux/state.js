let renderEntireTree = () => {
  alert("state is changed");
};

const state = {
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
  },
};

export const addPost = (postText) => {
  let newPost = {
    id: state.profilePage.posts.length + 1,
    post: postText,
    likesCount: Math.floor(Math.random() * 1000),
  };
  state.profilePage.posts.push(newPost);
  state.profilePage.newPostText = "";
  renderEntireTree();
};

export const changePost = (newText) => {
  state.profilePage.newPostText = newText;
  renderEntireTree();
};

export const subscribe = (observer) => {
  renderEntireTree = observer;
};

export default state;
