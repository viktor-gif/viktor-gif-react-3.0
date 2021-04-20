import React from "react";
import s from "./profileInfo.module.css";
import { Field, reduxForm } from "redux-form";
import { Input, Textarea } from "../../common/formControls/formControls";

const ProfileInfoForm = ({ info, handleSubmit, error }) => {
  let contacts = Object.keys(info.contacts).map((key) => {
    return (
      <div className={s.contactsItems} key={key}>
        <span>{key}</span>:{" "}
        <Field component={Input} type="text" name={"contacts." + key} />
      </div>
    );
  });
  return (
    <form onSubmit={handleSubmit}>
      {error && <div className={s.summaryError}>{error}</div>}
      <div>
        <button>submit</button>
      </div>
      <div className={s.formItem}>
        <span>Full name</span>: <Field component={Input} name="fullName" />
      </div>
      <div className={s.formItem}>
        <span>About me</span>: <Field component={Input} name="aboutMe" />
      </div>
      <div className={s.formItem}>
        <span>Looking for a job</span>:{" "}
        <Field component={Input} type="checkbox" name="lookingForAJob" />
      </div>
      <div className={s.formItem}>
        <span>Looking for a job description</span>:{" "}
        <Field component={Textarea} name="lookingForAJobDescription" />
      </div>
      <div className={s.formItem}>
        <span>contacts</span>: {contacts}
      </div>
    </form>
  );
};

const ProfileInfoReduxForm = reduxForm({
  form: "profile-info",
})(ProfileInfoForm);

export default ProfileInfoReduxForm;
