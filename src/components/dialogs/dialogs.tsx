import React from "react";
import Dialog from "./dialog/dialog";
import s from "./dialogs.module.css";
import Message from "./message/message";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Textarea } from "../common/formControls/formControls";
import { maxLengthCreator, required } from "../../validators/validators";
import { dialogType, messageType } from "./dialogsContainer";

type dialogsPropsType = {
  dialogs: Array<dialogType>;
  messages: Array<messageType>;

  addMessage: (messageText: string) => void;
};

const Dialogs: React.FC<dialogsPropsType> = (props) => {
  const dialogsElements = props.dialogs.map((d) => (
    <Dialog key={d.id} id={d.id} name={d.name} />
  ));

  const messagesElements = props.messages.map((m) => (
    <Message key={m.id} id={m.id} message={m.message} />
  ));

  const onSendMessage = (messageText: string) => {
    props.addMessage(messageText);
  };

  const submit = (values: dialogsFormValuesType) => {
    console.log(values);
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

type dialogsFormValuesType = {
  messageField: string;
};

const DialogsForm: React.FC<InjectedFormProps<dialogsFormValuesType>> = (
  props
) => {
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

const DialogsReduxForm = reduxForm<dialogsFormValuesType>({
  form: "dialogsText",
})(DialogsForm);

export default Dialogs;
