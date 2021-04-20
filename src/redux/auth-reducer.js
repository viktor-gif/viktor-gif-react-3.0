import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_AUTH_DATA = "vgif/auth/SET_AUTH_DATA";
const GET_CAPTCHA_URL_SUCCESS = "vgif/auth/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};
export const setAuthData = (userId, login, email, isAuth, captchaUrl) => ({
  type: SET_AUTH_DATA,
  data: { userId, login, email, isAuth, captchaUrl },
});
export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  data: { captchaUrl },
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
export const login = (email, password, rememberMe, captcha) => (dispatch) => {
  authAPI.login(email, password, rememberMe, captcha).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(getAuthData());
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrl());
      }
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
export const getCaptchaUrl = () => (dispatch) => {
  securityAPI.getCaptchaUrl().then((response) => {
    dispatch(getCaptchaUrlSuccess(response.data.url));
  });
};

export default authReducer;
