import React from "react";
import { Field, reduxForm } from "redux-form";

const LoginForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="email" component="input" placeholder="E-mail..." />
      </div>
      <div>
        <Field name="password" component="input" placeholder="Password..." />
      </div>
      <div>
        Remember me
        <Field name="rememberMe" component="input" type="checkbox" />
      </div>
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
    debugger;
    console.log(values);
  };

  return (
    <div>
      <h1>Login-page</h1>
      <LoginReduxForm onSubmit={submit} />
    </div>
  );
};

export default Login;
