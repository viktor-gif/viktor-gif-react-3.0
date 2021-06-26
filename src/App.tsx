import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store, { appStateType } from "./redux/redux-store";
import HeaderContainer from "./components/header/HeaderContainer";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import UsersPage from "./components/users/usersContainer";
import LoginContainer from "./components/login/loginContainer";
import { getAuthData } from "./redux/auth-reducer";
import { initialize } from "./redux/app-reducer";
import { connect } from "react-redux";
import { compose } from "redux";
const DialogsContainer = React.lazy(
  () => import("./components/dialogs/dialogsContainer")
);
const Profile = React.lazy(() => import("./components/profile/profile"));

type mapPropsType = ReturnType<typeof mapStateToProps>;
type dispatchPropsType = {
  initialize: () => void;
  getAuthData: () => void;
};

class App extends React.Component<mapPropsType & dispatchPropsType> {
  catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
    alert(promiseRejectionEvent.reason);
  };
  componentDidMount() {
    this.props.getAuthData();
    this.props.initialize();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }

  render() {
    if (!this.props.initialized) {
      return <h1>Loading...</h1>;
    }
    return (
      <BrowserRouter>
        <div className="App">
          <HeaderContainer />
          <Navbar />
          <div className="content-wrapper">
            <Switch>
              {/* <Route exact path="/" render={() => <Redirect to="/profile" />} /> */}
              <Route
                path="/profile/:userId?"
                render={() => {
                  return (
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <Profile />
                    </React.Suspense>
                  );
                }}
              />
              <Route
                path="/dialogs"
                render={() => {
                  return (
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <DialogsContainer />
                    </React.Suspense>
                  );
                }}
              />
              <Route path="/users" render={() => <UsersPage />} />
              <Route path="/login/facebook" render={() => <h1>Facebook</h1>} />
              <Route path="/login" render={() => <LoginContainer />} />
              <Redirect from="/" to="/profile" />
              <Route path="*" render={() => <div>404 NOT FOUND!</div>} />
            </Switch>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: appStateType) => ({
  initialized: state.app.initialized,
});

const AppContainer = compose<React.ComponentType>(
  connect(mapStateToProps, { getAuthData, initialize })
)(App);

const ViktorGifApp: React.FC = () => {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <AppContainer />
      </React.StrictMode>
    </Provider>
  );
};

export default ViktorGifApp;
