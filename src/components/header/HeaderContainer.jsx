import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { getAuthData, logout } from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.getAuthData();
  }

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

export default connect(mapStateToProps, { getAuthData, logout })(
  HeaderContainer
);
