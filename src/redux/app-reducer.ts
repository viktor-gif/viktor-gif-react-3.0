import { getAuthData } from "./auth-reducer";

const INITIALIZE_SUCCESS = "vgif/app/INITIALIZE_SUCCESS";

type initialStateType = {
  initialized: boolean;
};
const initialState: initialStateType = {
  initialized: false,
};

const appReducer = (
  state = initialState,
  action: initializeSuccessType
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
type initializeSuccessType = {
  type: typeof INITIALIZE_SUCCESS;
};
export const initializeSuccess = (): initializeSuccessType => ({
  type: INITIALIZE_SUCCESS,
});

//redux-thunks
export const initialize = () => (dispatch: any) => {
  let promise = dispatch(getAuthData());
  promise.then(() => {
    dispatch(initializeSuccess());
  });
};

export default appReducer;
