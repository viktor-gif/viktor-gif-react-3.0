import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  minLengthCreator,
  required,
} from "../../validators/validators";
import { Input } from "../common/formControls/formControls";

let minLength5 = minLengthCreator(5);
let maxLength12 = maxLengthCreator(12);

const LoginForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="email"
          component={Input}
          type="email"
          placeholder="E-mail..."
          validate={[required, minLength5]}
        />
      </div>
      <div>
        <Field
          name="password"
          component={Input}
          type="password"
          placeholder="Password..."
          validate={[required, maxLength12]}
        />
      </div>
      <div>
        Remember me
        <Field name="rememberMe" component={Input} type="checkbox" />
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
    props.login(values.email, values.password, values.rememberMe);
  };

  return (
    <div>
      <h1>Login-page</h1>
      <LoginReduxForm onSubmit={submit} />
    </div>
  );
};

export default Login;
