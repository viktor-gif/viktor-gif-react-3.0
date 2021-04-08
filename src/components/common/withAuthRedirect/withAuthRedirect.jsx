import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import React from "react";

const withAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isAuth) return <Redirect to="login" />;
      return <Component {...this.props} />;
    }
  }
  const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
  });
  return connect(mapStateToProps, {})(RedirectComponent);
};

export default withAuthRedirect;
