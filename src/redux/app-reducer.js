import { getAuthData } from "./auth-reducer";

const INITIALIZE_SUCCESS = "vgif/app/INITIALIZE_SUCCESS";

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};
export const initializeSuccess = () => ({ type: INITIALIZE_SUCCESS });

//redux-thunks
export const initialize = () => (dispatch) => {
  let promise = dispatch(getAuthData());
  promise.then(() => {
    dispatch(initializeSuccess());
  });
};

export default appReducer;
