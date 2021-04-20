import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  // maxLengthCreator,
  // minLengthCreator,
  required,
} from "../../validators/validators";
import { Input } from "../common/formControls/formControls";
import s from "./login.module.css";
import { Redirect } from "react-router-dom";

// let minLength5 = minLengthCreator(5);
// let maxLength12 = maxLengthCreator(12);

const LoginForm = (props) => {
  console.log(props.error);
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="email"
          component={Input}
          type="email"
          placeholder="E-mail..."
          validate={[required]}
        />
      </div>
      <div>
        <Field
          name="password"
          component={Input}
          type="password"
          placeholder="Password..."
          validate={[required]}
        />
      </div>
      <div>
        Remember me
        <Field name="rememberMe" component={Input} type="checkbox" />
      </div>

      {props.captchaUrl && (
        <div>
          <img alt="captcha" src={props.captchaUrl} />
          <Field
            name="captcha"
            component={Input}
            placeholder="Enter symbols from image"
            validate={[required]}
          />
        </div>
      )}

      {props.error && <div className={s.summaryError}>{props.error}</div>}
      <div>
        <button>Log in</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

const Login = (props) => {
  let submit = (values) => {
    props.login(
      values.email,
      values.password,
      values.rememberMe,
      values.captcha
    );
  };
  console.log(props.captchaUrl);
  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }
  return (
    <div>
      <h1>Login-page</h1>
      <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={submit} />
    </div>
  );
};

export default Login;
