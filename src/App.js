import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/redux-store";
import HeaderContainer from "./components/header/HeaderContainer";
import Navbar from "./components/navbar/navbar";
import Profile from "./components/profile/profile";
import Footer from "./components/footer/footer";
import { BrowserRouter, Route } from "react-router-dom";
import DialogsContainer from "./components/dialogs/dialogsContainer";
import UsersContainer from "./components/users/usersContainer";
import LoginContainer from "./components/login/loginContainer";
import { getAuthData } from "./redux/auth-reducer";
import { initialize } from "./redux/app-reducer";
import { connect } from "react-redux";

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
            <Route path="/profile/:userId?" render={() => <Profile />} />
            <Route path="/dialogs" render={() => <DialogsContainer />} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <LoginContainer />} />
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
