import Login from "./login";
import { login, logout } from "../../redux/auth-reducer";
import { connect } from "react-redux";

export default connect(null, { login, logout })(Login);
