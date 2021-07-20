import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import { reducer as formReducer } from "redux-form";
import appReducer from "./app-reducer";
import chatReducer from "./chat-reducer";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
  chat: chatReducer,
});

type rootReducerType = typeof rootReducer;
export type appStateType = ReturnType<rootReducerType>;

// type propertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;

// export type inferActionsTypes<
//   T extends { [key: string]: (...args: any[]) => any }
// > = ReturnType<propertiesTypes<T>>;

export type inferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

export type baseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  appStateType,
  unknown,
  A
>;

let store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;

export default store;
