import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/redux-store";
import HeaderContainer from "./components/header/HeaderContainer";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import UsersContainer from "./components/users/usersContainer";
import LoginContainer from "./components/login/loginContainer";
import { getAuthData } from "./redux/auth-reducer";
import { initialize } from "./redux/app-reducer";
import { connect } from "react-redux";
const DialogsContainer = React.lazy(() =>
  import("./components/dialogs/dialogsContainer")
);
const Profile = React.lazy(() => import("./components/profile/profile"));

class App extends React.Component {
  componentDidMount() {
    this.props.getAuthData();
    this.props.initialize();
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
              <Route path="/users" render={() => <UsersContainer />} />
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

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

const AppContainer = connect(mapStateToProps, { getAuthData, initialize })(App);

const ViktorGifApp = (props) => {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <AppContainer />
      </React.StrictMode>
    </Provider>
  );
};

export default ViktorGifApp;
