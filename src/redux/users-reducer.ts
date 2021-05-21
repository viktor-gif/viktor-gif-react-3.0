import { usersAPI } from "../api/api";
import { photosType } from "../Types";

const SET_USERS = "vgif/users/SET_USERS";
const FOLLOW = "vgif/users/FOLLOW";
const UNFOLLOW = "vgif/users/UNFOLLOW";
const SET_CURRENT_PAGE = "vgif/users/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "vgif/users/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "vgif/users/TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "vgif/users/TOGGLE_FOLLOWING_PROGRESS";

type userType = {
  id: number;
  name: string;
  status: string;
  photos: photosType;
  followed: boolean;
};

let initialState = {
  users: [] as Array<userType>,
  pageSize: 10,
  totalUsersCount: 0,
  selectedPage: 1,
  isFetching: false,
  followingInProgress: [],
};
type initialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };

    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        selectedPage: action.currentPage,
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.usersCount,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOGGLE_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.progress,
      };
    default:
      return state;
  }
};

type setUsersType = { type: typeof SET_USERS; users: any };
export const setUsers = (users: any): setUsersType => ({
  type: SET_USERS,
  users,
});

type setFollowType = { type: typeof FOLLOW; userId: number };
export const setFollow = (userId: number): setFollowType => ({
  type: FOLLOW,
  userId,
});

type setUnfollowType = { type: typeof UNFOLLOW; userId: number };
export const setUnfollow = (userId: number): setUnfollowType => ({
  type: UNFOLLOW,
  userId,
});

type setCurrentPageType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

type setTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  usersCount: number;
};
export const setTotalUsersCount = (
  usersCount: number
): setTotalUsersCountType => ({
  type: SET_TOTAL_USERS_COUNT,
  usersCount,
});

type setToggleFetchingType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export const setToggleFetching = (
  isFetching: boolean
): setToggleFetchingType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type toggleFollowingProgressType = {
  type: typeof TOGGLE_FOLLOWING_PROGRESS;
  progress: any;
};
export const toggleFollowingProgress = (
  progress: any
): toggleFollowingProgressType => ({
  type: TOGGLE_FOLLOWING_PROGRESS,
  progress,
});

//redux-thunks
export const requestUsers = (selectedPage = 1, pageSize = 10) => (
  dispatch: any
) => {
  dispatch(setToggleFetching(true));
  usersAPI.getUsers(selectedPage, pageSize).then((response) => {
    dispatch(setToggleFetching(false));
    dispatch(setUsers(response.data.items));
    dispatch(setTotalUsersCount(response.data.totalCount));
  });
};
export const follow = (userId: number) => (dispatch: any) => {
  dispatch(toggleFollowingProgress([userId]));
  usersAPI.follow(userId).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setFollow(userId));
    }
    dispatch(toggleFollowingProgress([false]));
  });
};
export const unfollow = (userId: number) => (dispatch: any) => {
  dispatch(toggleFollowingProgress([userId]));
  usersAPI.unfollow(userId).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setUnfollow(userId));
    }
    dispatch(toggleFollowingProgress([false]));
  });
};

export default usersReducer;
