import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ResultCodesEnum } from "../api/api";
import { usersAPI } from "../api/users-api";
import { photosType } from "../Types";
import { userType } from "../Types";
import { appStateType, inferActionsTypes } from "./redux-store";

// const SET_USERS = "vgif/users/SET_USERS";
// const FOLLOW = "vgif/users/FOLLOW";
// const UNFOLLOW = "vgif/users/UNFOLLOW";
// const SET_CURRENT_PAGE = "vgif/users/SET_CURRENT_PAGE";
// const SET_TOTAL_USERS_COUNT = "vgif/users/SET_TOTAL_USERS_COUNT";
// const TOGGLE_IS_FETCHING = "vgif/users/TOGGLE_IS_FETCHING";
// const TOGGLE_FOLLOWING_PROGRESS = "vgif/users/TOGGLE_FOLLOWING_PROGRESS";

let initialState = {
  users: [] as Array<userType>,
  pageSize: 100,
  totalUsersCount: 0,
  selectedPage: 1,
  isFetching: false,
  followingInProgress: [],
};
export type initialStateType = typeof initialState;

const usersReducer = (
  state = initialState,
  action: actionsTypes
): initialStateType => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.users,
      };

    case "FOLLOW":
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        selectedPage: action.currentPage,
      };
    case "SET_TOTAL_USERS_COUNT":
      return {
        ...state,
        totalUsersCount: action.usersCount,
      };
    case "TOGGLE_IS_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "TOGGLE_FOLLOWING_PROGRESS":
      return {
        ...state,
        followingInProgress: action.progress,
      };
    default:
      return state;
  }
};

type actionsTypes = inferActionsTypes<typeof actions>;

export const actions = {
  setUsers: (users: any) =>
    ({
      type: "SET_USERS",
      users,
    } as const),

  setFollow: (userId: number) =>
    ({
      type: "FOLLOW",
      userId,
    } as const),

  setUnfollow: (userId: number) =>
    ({
      type: "UNFOLLOW",
      userId,
    } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: "SET_CURRENT_PAGE",
      currentPage,
    } as const),

  setTotalUsersCount: (usersCount: number) =>
    ({
      type: "SET_TOTAL_USERS_COUNT",
      usersCount,
    } as const),

  setToggleFetching: (isFetching: boolean) =>
    ({
      type: "TOGGLE_IS_FETCHING",
      isFetching,
    } as const),

  toggleFollowingProgress: (progress: any) =>
    ({
      type: "TOGGLE_FOLLOWING_PROGRESS",
      progress,
    } as const),
};

type getStateType = () => appStateType;
type dispatchType = Dispatch<actionsTypes>;
type thunkType = ThunkAction<void, appStateType, unknown, actionsTypes>;

//redux-thunks
export const requestUsers = (selectedPage = 1, pageSize = 10) => (
  dispatch: dispatchType,
  getState: getStateType
) => {
  dispatch(actions.setToggleFetching(true));
  usersAPI.getUsers(selectedPage, pageSize).then((data) => {
    dispatch(actions.setToggleFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
  });
};
export const follow = (userId: number): thunkType => async (dispatch) => {
  dispatch(actions.toggleFollowingProgress([userId]));

  let data = await usersAPI.follow(userId);
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setFollow(userId));
  }
  dispatch(actions.toggleFollowingProgress([false]));
};
export const unfollow = (userId: number): thunkType => (dispatch) => {
  dispatch(actions.toggleFollowingProgress([userId]));
  usersAPI.unfollow(userId).then((data) => {
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setUnfollow(userId));
    }
    dispatch(actions.toggleFollowingProgress([false]));
  });
};
export const setCurrentPage = (currentPage: number): thunkType => (
  dispatch
) => {
  dispatch(actions.setCurrentPage(currentPage));
};

export default usersReducer;
