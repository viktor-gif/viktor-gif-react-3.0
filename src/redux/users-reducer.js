import { usersAPI } from "../api/api";

const SET_USERS = "vgif/users/SET_USERS";
const FOLLOW = "vgif/users/FOLLOW";
const UNFOLLOW = "vgif/users/UNFOLLOW";
const SET_CURRENT_PAGE = "vgif/users/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "vgif/users/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "vgif/users/TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "vgif/users/TOGGLE_FOLLOWING_PROGRESS";

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  selectedPage: 1,
  isFetching: false,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
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

export const setUsers = (users) => ({ type: SET_USERS, users });
export const setFollow = (userId) => ({ type: FOLLOW, userId });
export const setUnfollow = (userId) => ({ type: UNFOLLOW, userId });
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setTotalUsersCount = (usersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  usersCount,
});
export const setToggleFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export const toggleFollowingProgress = (progress) => ({
  type: TOGGLE_FOLLOWING_PROGRESS,
  progress,
});

//redux-thunks
export const requestUsers = (selectedPage = 1, pageSize = 10) => (dispatch) => {
  dispatch(setToggleFetching(true));
  usersAPI.getUsers(selectedPage, pageSize).then((response) => {
    dispatch(setToggleFetching(false));
    dispatch(setUsers(response.data.items));
    dispatch(setTotalUsersCount(response.data.totalCount));
  });
};
export const follow = (userId) => (dispatch) => {
  dispatch(toggleFollowingProgress([userId]));
  usersAPI.follow(userId).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setFollow(userId));
    }
    dispatch(toggleFollowingProgress([false]));
  });
};
export const unfollow = (userId) => (dispatch) => {
  dispatch(toggleFollowingProgress([userId]));
  usersAPI.unfollow(userId).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setUnfollow(userId));
    }
    dispatch(toggleFollowingProgress([false]));
  });
};

export default usersReducer;
