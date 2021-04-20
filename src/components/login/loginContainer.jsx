import Login from "./login";
import { login, logout } from "../../redux/auth-reducer";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login, logout })(Login);
