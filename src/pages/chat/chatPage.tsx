import React, { useEffect, useState } from "react";
import { chatMessageType } from "../../api/chat-api";
import { useDispatch, useSelector } from "react-redux";
import {
  startMessagesListening,
  stopMessagesListening,
  sendMessage,
} from "../../redux/chat-reducer";
import { appStateType } from "../../redux/redux-store";

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  const status = useSelector((state: appStateType) => state.chat.status);

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      {status === "error" && (
        <div>Some error occured. Please refresh the page</div>
      )}
      <Messages />
      <AddMessageForm />
    </div>
  );
};

const Messages: React.FC<{}> = () => {
  console.log(">>>>>>Messages");
  const messages = useSelector((state: appStateType) => state.chat.messages);

  return (
    <div style={{ height: "200px", overflowY: "auto" }}>
      {messages.map((m, index) => (
        <Message key={index} message={m} />
      ))}
    </div>
  );
};

const Message: React.FC<{ message: chatMessageType }> = ({ message }) => {
  return (
    <div>
      <img alt="User-avatar" src={message.photo} style={{ width: "30px" }} />
      <b>{message.userName}</b>

      <div>{message.message}</div>
      <hr />
    </div>
  );
};

const AddMessageForm: React.FC<{}> = () => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const status = useSelector((state: appStateType) => state.chat.status);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage("");
  };

  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        ></textarea>
      </div>
      <div>
        <button disabled={status !== "ready"} onClick={sendMessageHandler}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
