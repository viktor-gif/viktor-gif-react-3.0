import Login from "./login";
import { login, logout } from "../../redux/auth-reducer";
import { connect } from "react-redux";
import { appStateType } from "../../redux/redux-store";

type mapStatePropsType = {
  captchaUrl: string | null;
  isAuth: boolean;
};

type mapDispatchPropsType = {
  login: (
    email: string | null,
    password: string | null,
    rememberMe: boolean,
    captcha: any
  ) => void;
  logout: () => void;
};

type propsType = mapStatePropsType & mapDispatchPropsType;

const mapStateToProps = (state: appStateType): mapStatePropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect<
  mapStatePropsType,
  mapDispatchPropsType,
  propsType,
  appStateType
>(mapStateToProps, { login, logout })(Login);
