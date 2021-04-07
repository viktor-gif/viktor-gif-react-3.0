import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { getAuthData } from "../../redux/auth-reducer";
import { authAPI } from "../../api/api";

class HeaderContainer extends React.Component {
  componentDidMount() {
    authAPI.getAuthData().then((response) => {
      if (response.data.resultCode === 0) {
        this.props.getAuthData(response.data.data);
      }
    });
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
