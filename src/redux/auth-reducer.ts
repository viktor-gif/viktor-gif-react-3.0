import { Dispatch } from "redux";
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { ResultCodesEnum } from "../api/api";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { appStateType, inferActionsTypes } from "./redux-store";

let initialState = {
  userId: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

const authReducer = (
  state = initialState,
  action: actionsTypes
): initialStateType => {
  switch (action.type) {
    case "vgif/auth/SET_AUTH_DATA":
    case "vgif/auth/GET_CAPTCHA_URL_SUCCESS":
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

export const actions = {
  setAuthData: (
    userId: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
  ) =>
    ({
      type: "vgif/auth/SET_AUTH_DATA",
      data: { userId, login, email, isAuth },
    } as const),
  getCaptchaUrlSuccess: (captchaUrl: string | null) =>
    ({
      type: "vgif/auth/GET_CAPTCHA_URL_SUCCESS",
      data: { captchaUrl },
    } as const),
};

//redux-thunks
export const getAuthData = () => async (dispatch: dispatchType) => {
  // return authAPI.getAuthData().then((response) => {
  let authData = await authAPI.getAuthData();
  if (authData.resultCode === ResultCodesEnum.Success) {
    // @ts-ignore
    let { id, login, email } = authData.data;
    dispatch(actions.setAuthData(id, login, email, true));
  }
  // });
};
export const login = (
  email: string | null,
  password: string | null,
  rememberMe: boolean,
  captcha: any
): thunkType => (dispatch) => {
  authAPI.login(email, password, rememberMe, captcha).then((data) => {
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthData());
    } else {
      if (data.resultCode === ResultCodesEnum.CapthaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      let errorMessage =
        data.messages.length > 0 ? data.messages[0] : "some error";
      // @ts-ignore
      dispatch(stopSubmit("login", { _error: errorMessage }));
    }
  });
};
export const logout = () => (dispatch: dispatchType) => {
  authAPI.logout().then((data) => {
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setAuthData(null, null, null, false));
    }
  });
};
export const getCaptchaUrl = (): thunkType => (dispatch) => {
  securityAPI.getCaptchaUrl().then((data) => {
    dispatch(actions.getCaptchaUrlSuccess(data.url));
  });
};

export default authReducer;

type initialStateType = typeof initialState;
type actionsTypes = inferActionsTypes<typeof actions>;

type dispatchType = Dispatch<actionsTypes>;
type thunkType = ThunkAction<void, appStateType, unknown, actionsTypes>;
