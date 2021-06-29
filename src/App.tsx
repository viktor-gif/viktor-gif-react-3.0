import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store, { appStateType } from "./redux/redux-store";
import HeaderContainer from "./components/header/HeaderContainer";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import UsersPage from "./components/users/usersContainer";
import { LoginPage } from "./components/login/login";
import { getAuthData } from "./redux/auth-reducer";
import { initialize } from "./redux/app-reducer";
import { connect } from "react-redux";
import { compose } from "redux";
import "antd/dist/antd.css";
import { Button } from "antd";

import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const DialogsContainer = React.lazy(
  () => import("./components/dialogs/dialogsContainer")
);
const Profile = React.lazy(() => import("./components/profile/profile"));

type mapPropsType = ReturnType<typeof mapStateToProps>;
type dispatchPropsType = {
  initialize: () => void;
  getAuthData: () => void;
};

// class SiderDemo extends React.Component {
//   state = {
//     collapsed: false,
//   };

//   toggle = () => {
//     this.setState({
//       collapsed: !this.state.collapsed,
//     });
//   };

class App extends React.Component<mapPropsType & dispatchPropsType> {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
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
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <BrowserRouter>
              <div className="App">
                {/* <HeaderContainer />
                <Navbar /> */}
                <div className="content-wrapper">
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={() => <Redirect to="/profile" />}
                    />
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
                    <Route
                      path="/login/facebook"
                      render={() => <h1>Facebook</h1>}
                    />
                    <Route path="/login" render={() => <LoginPage />} />
                    <Redirect from="/" to="/profile" />
                    <Route path="*" render={() => <div>404 NOT FOUND!</div>} />
                  </Switch>
                </div>

                {/* <Footer /> */}
              </div>
            </BrowserRouter>
          </Content>
        </Layout>
      </Layout>

      // <BrowserRouter>
      //   <div className="App">
      //     <HeaderContainer />
      //     <Navbar />
      //     <div className="content-wrapper">
      //       <Switch>
      //         {/* <Route exact path="/" render={() => <Redirect to="/profile" />} /> */}
      //         <Route
      //           path="/profile/:userId?"
      //           render={() => {
      //             return (
      //               <React.Suspense fallback={<div>Loading...</div>}>
      //                 <Button type="primary">Ant Design</Button>
      //                 <Profile />
      //               </React.Suspense>
      //             );
      //           }}
      //         />
      //         <Route
      //           path="/dialogs"
      //           render={() => {
      //             return (
      //               <React.Suspense fallback={<div>Loading...</div>}>
      //                 <DialogsContainer />
      //               </React.Suspense>
      //             );
      //           }}
      //         />
      //         <Route path="/users" render={() => <UsersPage />} />
      //         <Route path="/login/facebook" render={() => <h1>Facebook</h1>} />
      //         <Route path="/login" render={() => <LoginPage />} />
      //         <Redirect from="/" to="/profile" />
      //         <Route path="*" render={() => <div>404 NOT FOUND!</div>} />
      //       </Switch>
      //     </div>

      //     <Footer />
      //   </div>
      // </BrowserRouter>
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
