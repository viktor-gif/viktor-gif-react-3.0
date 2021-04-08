import { authAPI } from "../api/api";

const SET_AUTH_DATA = "SET_AUTH_DATA";

let initialState = {
  userData: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        userData: action.data, //object {id, login, email}
        isAuth: true,
      };
    default:
      return state;
  }
};
export const setAuthData = (data) => ({
  type: SET_AUTH_DATA,
  data,
});

export const getAuthData = () => (dispatch) => {
  authAPI.getAuthData().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthData(response.data.data));
    }
  });
};

export default authReducer;
