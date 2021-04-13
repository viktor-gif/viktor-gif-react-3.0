import { createSelector } from "reselect";

export const getUsers = (state) => {
  return state.usersPage.users;
};

export const getUsersSelector = createSelector(getUsers, (users) => {
  return users.filter(() => true);
});

export const getPageSize = (state) => {
  return state.usersPage.pageSize;
};
export const getTotalUsersCount = (state) => {
  return state.usersPage.totalUsersCount;
};
export const getSelectedPage = (state) => {
  return state.usersPage.selectedPage;
};
export const getIsFetching = (state) => {
  return state.usersPage.isFetching;
};
export const getFollowingInProgress = (state) => {
  return state.usersPage.followingInProgress;
};
