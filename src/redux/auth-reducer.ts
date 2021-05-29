import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_AUTH_DATA = "vgif/auth/SET_AUTH_DATA";
const GET_CAPTCHA_URL_SUCCESS = "vgif/auth/GET_CAPTCHA_URL_SUCCESS";

type initialStateType = {
  userId: number | null;
  login: string | null;
  email: string | null;
  isAuth: boolean;
  captchaUrl: string | null;
};

let initialState: initialStateType = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action: any): initialStateType => {
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

type setAuthDataType = {
  type: typeof SET_AUTH_DATA;
  data: dataType;
};
type dataType = {
  userId: number | null;
  login: string | null;
  email: string | null;
  isAuth: boolean;
};
export const setAuthData = (
  userId: number | null,
  login: string | null,
  email: string | null,
  isAuth: boolean
): setAuthDataType => ({
  type: SET_AUTH_DATA,
  data: { userId, login, email, isAuth },
});

type getCaptchaUrlSuccessType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  data: captchaType;
};
type captchaType = { captchaUrl: string | null };
export const getCaptchaUrlSuccess = (
  captchaUrl: string | null
): getCaptchaUrlSuccessType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  data: { captchaUrl },
});

//redux-thunks
export const getAuthData = () => (dispatch: any) => {
  return authAPI.getAuthData().then((response) => {
    if (response.data.resultCode === 0) {
      let { id, login, email } = response.data.data;
      dispatch(setAuthData(id, login, email, true));
    }
  });
};
export const login = (
  email: string | null,
  password: string | null,
  rememberMe: boolean,
  captcha: any
) => (dispatch: any) => {
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
export const logout = () => (dispatch: any) => {
  authAPI.logout().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthData(null, null, null, false));
    }
  });
};
export const getCaptchaUrl = () => (dispatch: any) => {
  securityAPI.getCaptchaUrl().then((response) => {
    dispatch(getCaptchaUrlSuccess(response.data.url));
  });
};

export default authReducer;
