import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import React from "react";
import { appStateType } from "../../../redux/redux-store";

const mapStateToProps = (state: appStateType) => ({
  isAuth: state.auth.isAuth,
});

type mapPropsType = {
  isAuth: boolean;
};

function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<mapPropsType> = (props) => {
    let { isAuth, ...restProps } = props;
    if (!props.isAuth) return <Redirect to="login" />;
    return <Component {...(restProps as WCP)} />;
  };
  return connect(mapStateToProps, {})(RedirectComponent);
}

export default withAuthRedirect;
