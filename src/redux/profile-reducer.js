import { profileAPI } from "../api/api";

const ADD_POST = "ADD_POST";
const UPDATE_POST_TEXT = "UPDATE_POST_TEXT";
const SET_PROFILE = "SET_PROFILE";

let initialState = {
  posts: [
    { id: 1, post: "Hello", likesCount: 5 },
    { id: 2, post: "I'm a cool developer", likesCount: 23 },
    { id: 3, post: "Hello world!!!!", likesCount: 0 },
  ],
  newPostText: "",
  profileInfo: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: state.posts.length + 1,
        post: action.postText,
        likesCount: Math.floor(Math.random() * 1000),
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };

    case UPDATE_POST_TEXT:
      return {
        ...state,
        newPostText: action.newText,
      };
    case SET_PROFILE:
      return {
        ...state,
        profileInfo: action.profileInfo,
      };
    default:
      return state;
  }
};

export const addPost = (postText) => ({ type: ADD_POST, postText });
export const updatePostText = (newText) => ({
  type: UPDATE_POST_TEXT,
  newText,
});
export const setProfile = (profileInfo) => ({ type: SET_PROFILE, profileInfo });

//redux-thunk
export const getProfile = () => (dispatch) => {
  profileAPI.setProfile().then((response) => {
    dispatch(setProfile(response.data));
  });
};

export default profileReducer;
