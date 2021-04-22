import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";

const ADD_POST = "vgif/profile/ADD_POST";
const DELETE_POST = "vgif/profile/DELETE_POST";
const SET_PROFILE = "vgif/profile/SET_PROFILE";
const SET_STATUS = "vgif/profile/SET_STATUS";
const LOAD_PROFILE_PHOTO = "vgif/profile/LOAD_PROFILE_PHOTO";
const SAVE_PHOTO_SUCCESS = "vgif/profile/SAVE_PHOTO_SUCCESS";

type postsType = { id: number; post: string; likesCount: number };
type profileInfoType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  aboutMe: string;
  contacts: contactsType;
  photos: photosType;
};
type contactsType = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink: string | null;
};
type photosType = {
  small: string | null;
  large: string | null;
};
type initialStateType = typeof initialState;
let initialState = {
  posts: [
    { id: 1, post: "Hello", likesCount: 5 },
    { id: 2, post: "I'm a cool developer", likesCount: 23 },
    { id: 3, post: "Hello world!!!!", likesCount: 0 },
  ] as Array<postsType>,
  profileInfo: null as profileInfoType | null,
  status: "",
};

const profileReducer = (
  state = initialState,
  action: any
): initialStateType => {
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
        profileInfo: {
          ...state.profileInfo,
          photos: action.photoFile,
        } as profileInfoType,
      };
    default:
      return state;
  }
};

type addPostType = { type: typeof ADD_POST; postText: string };
export const addPost = (postText: any): addPostType => ({
  type: ADD_POST,
  postText,
});

type deletePostType = { type: typeof DELETE_POST; id: number };
export const deletePost = (id: number): deletePostType => ({
  type: DELETE_POST,
  id,
});

type setProfileType = {
  type: typeof SET_PROFILE;
  profileInfo: profileInfoType;
};
export const setProfile = (profileInfo: profileInfoType): setProfileType => ({
  type: SET_PROFILE,
  profileInfo,
});

type setStatusType = { type: typeof SET_STATUS; status: string };
export const setStatus = (status: string): setStatusType => ({
  type: SET_STATUS,
  status,
});

type loadProfilePhotoType = { type: typeof LOAD_PROFILE_PHOTO; file: any };
export const loadProfilePhoto = (file: any): loadProfilePhotoType => ({
  type: LOAD_PROFILE_PHOTO,
  file,
});

type savePhotoSuccessType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photoFile: any;
};
export const savePhotoSuccess = (photoFile: any): savePhotoSuccessType => ({
  type: SAVE_PHOTO_SUCCESS,
  photoFile,
});

//redux-thunk
export const getProfile = (userId: number) => (dispatch: any) => {
  profileAPI.setProfile(userId).then((response) => {
    dispatch(setProfile(response.data));
  });
};
export const getStatus = (userId: number) => (dispatch: any) => {
  profileAPI.getStatus(userId).then((response) => {
    dispatch(setStatus(response.data));
  });
};
export const updateStatus = (status: string) => async (dispatch: any) => {
  try {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (error) {
    console.log(error);
  }
};
export const setProfilePhoto = (file: any) => (dispatch: any) => {
  profileAPI.setProfilePhoto(file).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(savePhotoSuccess(response.data.data.photos));
    }
  });
};

// thunk-creators
export const updateProfileInfo = (info: any) => async (
  dispatch: any,
  getState: any
) => {
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
