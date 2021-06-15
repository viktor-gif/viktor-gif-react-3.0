import { Dispatch } from "redux";
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { ResultCodesEnum } from "../api/api";
import { profileAPI } from "../api/profile-api";
import { profileInfoType } from "../Types";
import { appStateType, inferActionsTypes } from "./redux-store";

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

type actionsTypes = inferActionsTypes<typeof actions>;

export const actions = {
  addPost: (postText: string) =>
    ({
      type: ADD_POST,
      postText,
    } as const),

  deletePost: (id: number) =>
    ({
      type: DELETE_POST,
      id,
    } as const),

  setProfile: (profileInfo: profileInfoType) =>
    ({
      type: SET_PROFILE,
      profileInfo,
    } as const),

  setStatus: (status: string) =>
    ({
      type: SET_STATUS,
      status,
    } as const),

  loadProfilePhoto: (file: any) =>
    ({
      type: LOAD_PROFILE_PHOTO,
      file,
    } as const),

  savePhotoSuccess: (photoFile: any) =>
    ({
      type: SAVE_PHOTO_SUCCESS,
      photoFile,
    } as const),
};

type dispatchType = Dispatch<actionsTypes>;

type thunkType = ThunkAction<void, appStateType, unknown, actionsTypes>;

//redux-thunk
export const getProfile = (userId: number) => (dispatch: dispatchType) => {
  profileAPI.setProfile(userId).then((data) => {
    dispatch(actions.setProfile(data));
  });
};
export const getStatus = (userId: number): thunkType => (dispatch) => {
  profileAPI.getStatus(userId).then((data) => {
    dispatch(actions.setStatus(data));
  });
};
export const updateStatus = (status: string) => async (
  dispatch: dispatchType
) => {
  try {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setStatus(status));
    }
  } catch (error) {
    console.log(error);
  }
};
export const setProfilePhoto = (file: any): thunkType => (dispatch) => {
  profileAPI.setProfilePhoto(file).then((data) => {
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.savePhotoSuccess(data.data.photos));
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
export const addPost = (postText: string): thunkType => (dispatch) => {
  dispatch(actions.addPost(postText));
};
export const deletePost = (id: number): thunkType => (dispatch) => {
  dispatch(actions.deletePost(id));
};

export default profileReducer;
