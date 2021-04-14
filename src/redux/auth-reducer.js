import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_AUTH_DATA = "vgif/auth/SET_AUTH_DATA";

let initialState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
export const setAuthData = (userId, login, email, isAuth) => ({
  type: SET_AUTH_DATA,
  data: { userId, login, email, isAuth },
});

//redux-thunks
export const getAuthData = () => (dispatch) => {
  return authAPI.getAuthData().then((response) => {
    if (response.data.resultCode === 0) {
      let { id, login, email } = response.data.data;
      dispatch(setAuthData(id, login, email, true));
    }
  });
};
export const login = (email, password, rememberMe) => (dispatch) => {
  authAPI.login(email, password, rememberMe).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(getAuthData());
    } else {
      let errorMessage =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : "some error";
      dispatch(stopSubmit("login", { _error: errorMessage }));
    }
  });
};
export const logout = () => (dispatch) => {
  authAPI.logout().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthData(null, null, null, false));
    }
  });
};

export default authReducer;
