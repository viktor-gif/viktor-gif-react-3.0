import { Dispatch } from "redux";
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { ResultCodesEnum } from "../api/api";
import { profileAPI } from "../api/profile-api";
import { profileInfoType } from "../Types";
import { appStateType } from "./redux-store";

const ADD_POST = "vgif/profile/ADD_POST";
const DELETE_POST = "vgif/profile/DELETE_POST";
const SET_PROFILE = "vgif/profile/SET_PROFILE";
const SET_STATUS = "vgif/profile/SET_STATUS";
const LOAD_PROFILE_PHOTO = "vgif/profile/LOAD_PROFILE_PHOTO";
const SAVE_PHOTO_SUCCESS = "vgif/profile/SAVE_PHOTO_SUCCESS";

type postsType = { id: number; post: string; likesCount: number };

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
  action: actionsTypes
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

type actionsTypes =
  | addPostType
  | deletePostType
  | setProfileType
  | setStatusType
  | loadProfilePhotoType
  | savePhotoSuccessType;

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

type dispatchType = Dispatch<actionsTypes>;

type thunkType = ThunkAction<void, appStateType, unknown, actionsTypes>;

//redux-thunk
export const getProfile = (userId: number) => (dispatch: dispatchType) => {
  profileAPI.setProfile(userId).then((data) => {
    dispatch(setProfile(data));
  });
};
export const getStatus = (userId: number): thunkType => (dispatch) => {
  profileAPI.getStatus(userId).then((data) => {
    dispatch(setStatus(data));
  });
};
export const updateStatus = (status: string) => async (
  dispatch: dispatchType
) => {
  try {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(setStatus(status));
    }
  } catch (error) {
    console.log(error);
  }
};
export const setProfilePhoto = (file: any): thunkType => (dispatch) => {
  profileAPI.setProfilePhoto(file).then((data) => {
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(savePhotoSuccess(data.data.photos));
    }
  });
};

export const updateProfileInfo = (info: profileInfoType) => async (
  dispatch: dispatchType,
  getState: () => appStateType
) => {
  const userId = getState().auth.userId;
  let data = await profileAPI.updateProfileInfo(info);
  if (data.resultCode === ResultCodesEnum.Success) {
    // @ts-ignore
    dispatch(getProfile(userId));
  } else {
    let errorMessage =
      data.messages.length > 0 ? data.messages[0] : "some error";
    // @ts-ignore
    dispatch(stopSubmit("profile-info", { _error: errorMessage }));
    return Promise.reject(data.messages[0]);
  }
};

export default profileReducer;
