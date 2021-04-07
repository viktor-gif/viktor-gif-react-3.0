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
export const getAuthData = (data) => ({
  type: SET_AUTH_DATA,
  data,
});

export default authReducer;
