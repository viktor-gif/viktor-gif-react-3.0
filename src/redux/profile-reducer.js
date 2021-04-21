import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";

const ADD_POST = "vgif/profile/ADD_POST";
const DELETE_POST = "vgif/profile/DELETE_POST";
const SET_PROFILE = "vgif/profile/SET_PROFILE";
const SET_STATUS = "vgif/profile/SET_STATUS";
const LOAD_PROFILE_PHOTO = "vgif/profile/LOAD_PROFILE_PHOTO";
const SAVE_PHOTO_SUCCESS = "vgif/profile/SAVE_PHOTO_SUCCESS";

let initialState = {
  posts: [
    { id: 1, post: "Hello", likesCount: 5 },
    { id: 2, post: "I'm a cool developer", likesCount: 23 },
    { id: 3, post: "Hello world!!!!", likesCount: 0 },
  ],
  profileInfo: null,
  status: "",
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
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.id),
      };
    case SET_PROFILE:
      return {
        ...state,
        profileInfo: action.profileInfo,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profileInfo: { ...state.profileInfo, photos: action.photoFile },
      };
    default:
      return state;
  }
};

export const addPost = (postText) => ({ type: ADD_POST, postText });
export const deletePost = (id) => ({ type: DELETE_POST, id });

export const setProfile = (profileInfo) => ({ type: SET_PROFILE, profileInfo });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const loadProfilePhoto = (file) => ({ type: LOAD_PROFILE_PHOTO, file });
export const savePhotoSuccess = (photoFile) => ({
  type: SAVE_PHOTO_SUCCESS,
  photoFile,
});

//redux-thunk
export const getProfile = (userId) => (dispatch) => {
  profileAPI.setProfile(userId).then((response) => {
    dispatch(setProfile(response.data));
  });
};
export const getStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId).then((response) => {
    dispatch(setStatus(response.data));
  });
};
export const updateStatus = (status) => async (dispatch) => {
  try {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (error) {
    console.log(error);
  }
};
export const setProfilePhoto = (file) => (dispatch) => {
  profileAPI.setProfilePhoto(file).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(savePhotoSuccess(response.data.data.photos));
    }
  });
};
export const updateProfileInfo = (info) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  let response = await profileAPI.updateProfileInfo(info);
  if (response.data.resultCode === 0) {
    dispatch(getProfile(userId));
  } else {
    let errorMessage =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : "some error";
    dispatch(stopSubmit("profile-info", { _error: errorMessage }));
    return Promise.reject(response.data.messages[0]);
  }
};

export default profileReducer;
