import { ThunkAction } from "redux-thunk";
import { getAuthData } from "./auth-reducer";
import { appStateType } from "./redux-store";

const INITIALIZE_SUCCESS = "vgif/app/INITIALIZE_SUCCESS";

type initialStateType = {
  initialized: boolean;
};
const initialState: initialStateType = {
  initialized: false,
};

const appReducer = (
  state = initialState,
  action: actionsTypes
): initialStateType => {
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

type actionsTypes = initializeSuccessType;

type initializeSuccessType = {
  type: typeof INITIALIZE_SUCCESS;
};
export const initializeSuccess = (): initializeSuccessType => ({
  type: INITIALIZE_SUCCESS,
});

type thunkType = ThunkAction<void, appStateType, unknown, actionsTypes>;

//redux-thunks
export const initialize = (): thunkType => (dispatch) => {
  let promise = dispatch(getAuthData());
  promise.then(() => {
    dispatch(initializeSuccess());
  });
};

export default appReducer;
