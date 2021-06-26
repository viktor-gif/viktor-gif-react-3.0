import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ResultCodesEnum, responseType } from "../api/api";
import { usersAPI } from "../api/users-api";
import { userType } from "../Types";
import { appStateType, inferActionsTypes, baseThunkType } from "./redux-store";

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
  followingInProgress: [] as Array<number>,
  filter: {
    term: "",
    friend: null as null | boolean,
  },
};

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
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

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

  setFilter: (filter: filterType) =>
    ({
      type: "SET_FILTER",
      payload: filter,
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

//redux-thunks
export const requestUsers = (
  selectedPage = 1,
  pageSize = 10,
  filter: filterType
) => (dispatch: dispatchType, getState: getStateType) => {
  dispatch(actions.setToggleFetching(true));
  dispatch(actions.setFilter(filter));
  usersAPI
    .getUsers(selectedPage, pageSize, filter.term, filter.friend)
    .then((data) => {
      dispatch(actions.setToggleFetching(false));
      dispatch(actions.setUsers(data.items));
      dispatch(actions.setTotalUsersCount(data.totalCount));
    });
};

const _followUnfollowFlow = async (
  dispatch: Dispatch<actionsTypes>,
  userId: number,
  apiMethod: (userId: number) => Promise<responseType>,
  actionCreator: (userId: number) => actionsTypes
) => {
  dispatch(actions.toggleFollowingProgress([userId]));
  let response = await apiMethod(userId);

  if (response.resultCode == 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress([false]));
};
export const follow = (userId: number): thunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      actions.setFollow
    );
  };
};

export const unfollow = (userId: number): thunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow.bind(usersAPI),
      actions.setUnfollow
    );
  };
};

// export const follow = (userId: number): thunkType => async (dispatch) => {
//   dispatch(actions.toggleFollowingProgress([userId]));

//   let data = await usersAPI.follow(userId);
//   if (data.resultCode === ResultCodesEnum.Success) {
//     dispatch(actions.setFollow(userId));
//   }
//   dispatch(actions.toggleFollowingProgress([false]));
// };
// export const unfollow = (userId: number): thunkType => (dispatch) => {
//   dispatch(actions.toggleFollowingProgress([userId]));
//   usersAPI.unfollow(userId).then((data) => {
//     if (data.resultCode === ResultCodesEnum.Success) {
//       dispatch(actions.setUnfollow(userId));
//     }
//     dispatch(actions.toggleFollowingProgress([false]));
//   });
// };
export const setCurrentPage = (currentPage: number): thunkType => (
  dispatch
) => {
  dispatch(actions.setCurrentPage(currentPage));
};

export default usersReducer;

export type initialStateType = typeof initialState;
export type filterType = typeof initialState.filter;
type actionsTypes = inferActionsTypes<typeof actions>;
type getStateType = () => appStateType;
type dispatchType = Dispatch<actionsTypes>;
type thunkType = ThunkAction<void, appStateType, unknown, actionsTypes>;
// type thunkType = baseThunkType<actionsTypes>
