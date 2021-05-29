import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { logout } from "../../redux/auth-reducer";
import { appStateType } from "../../redux/redux-store";

type mapStatePropsType = {
  isAuth: boolean;
  login: string | null;
};

type mapDispatchPropsType = {
  logout: () => void;
};

type propsType = mapStatePropsType & mapDispatchPropsType;

class HeaderContainer extends React.Component<propsType> {
  render() {
    return (
      <Header
        login={this.props.login}
        isAuth={this.props.isAuth}
        logout={this.props.logout}
      />
    );
  }
}

const mapStateToProps = (state: appStateType): mapStatePropsType => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth,
});

export default connect<
  mapStatePropsType,
  mapDispatchPropsType,
  propsType,
  appStateType
>(mapStateToProps, { logout })(HeaderContainer);
