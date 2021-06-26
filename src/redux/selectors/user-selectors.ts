import { createSelector } from "reselect";
import { appStateType } from "../redux-store";

export const getUsers = (state: appStateType) => {
  return state.usersPage.users;
};

export const getUsersSelector = createSelector(getUsers, (users) => {
  return users.filter(() => true);
});

export const getPageSize = (state: appStateType) => {
  return state.usersPage.pageSize;
};
export const getTotalUsersCount = (state: appStateType) => {
  return state.usersPage.totalUsersCount;
};
export const getSelectedPage = (state: appStateType) => {
  return state.usersPage.selectedPage;
};
export const getIsFetching = (state: appStateType) => {
  return state.usersPage.isFetching;
};
export const getFollowingInProgress = (state: appStateType) => {
  return state.usersPage.followingInProgress;
};
export const getUsersFilter = (state: appStateType) => {
  return state.usersPage.filter;
};
