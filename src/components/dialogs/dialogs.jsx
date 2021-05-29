import React from "react";
import Dialog from "./dialog/dialog";
import s from "./dialogs.module.css";
import Message from "./message/message";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../common/formControls/formControls";
import { maxLengthCreator, required } from "../../validators/validators";

const Dialogs = (props) => {
  const dialogsElements = props.dialogs.map((d) => (
    <Dialog key={d.id} id={d.id} name={d.name} />
  ));

  const messagesElements = props.messages.map((m) => (
    <Message key={m.id} id={m.id} message={m.message} />
  ));

  const onSendMessage = (messageText) => {
    props.addMessage(messageText);
  };
  const submit = (values) => {
    onSendMessage(values.messageField);
  };
  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.contacts}>{dialogsElements}</div>
        <div className={s.messages}>{messagesElements}</div>
      </div>
      <div className={s.formMessage}>
        <DialogsReduxForm onSubmit={submit} />
      </div>
    </div>
  );
};
let maxLength20 = maxLengthCreator(20);
const DialogsForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          component={Textarea}
          placeholder="Enter text of a message"
          name="messageField"
          validate={[required, maxLength20]}
        />
      </div>
      <div>
        <button>Send message</button>
      </div>
    </form>
  );
};

const DialogsReduxForm = reduxForm({
  form: "dialogsText",
})(DialogsForm);

export default Dialogs;
