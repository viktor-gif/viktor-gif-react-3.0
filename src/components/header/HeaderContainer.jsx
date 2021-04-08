import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { getAuthData } from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.getAuthData();
  }

  render() {
    return <Header userData={this.props.userData} isAuth={this.props.isAuth} />;
  }
}

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { getAuthData })(HeaderContainer);
