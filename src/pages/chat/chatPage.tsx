import React from "react";

const ws = new WebSocket(
  "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
);

const ChatPage: React.FC = () => {
  return <Chat />;
};

const Chat: React.FC = () => {
  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};

const Messages: React.FC = () => {
  const messages = [1, 2, 3, 4];
  return (
    <div style={{ height: "200px", overflowY: "auto" }}>
      {messages.map((m: any) => (
        <Message />
      ))}
      {messages.map((m: any) => (
        <Message />
      ))}
      {messages.map((m: any) => (
        <Message />
      ))}
    </div>
  );
};

const Message: React.FC = () => {
  const message = {
    url: "https://via.placeholder.com/50",
    author: "Viktor-gif",
    text: "Hello friends!!!",
  };
  return (
    <div>
      <img src={message.url} />
      <b>{message.author}</b>

      <div>{message.text}</div>
      <hr />
    </div>
  );
};

const AddMessageForm: React.FC = () => {
  return (
    <div>
      <div>
        <textarea></textarea>
      </div>
      <div>
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
