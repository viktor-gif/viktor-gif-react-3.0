import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { logout } from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
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

const mapStateToProps = (state) => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { logout })(HeaderContainer);
