import { authAPI } from "../api/api";
import { getAuthData } from "./auth-reducer";

const INITIALIZE_SUCCESS = "INITIALIZE_SUCCESS";

let initialState = {
  initialized: false,
  fakes: 10,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    case "fake":
      return {
        ...state,
        fakes: state.fakes + 1,
      };
    default:
      return state;
  }
};
export const initializeSuccess = () => ({ type: INITIALIZE_SUCCESS });
export const fake = () => ({ type: "fake" });

//redux-thunks
export const initialize = () => (dispatch) => {
  let promise = dispatch(getAuthData());
  promise.then(() => {
    dispatch(initializeSuccess());
  });
};

export default appReducer;
