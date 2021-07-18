import React, { useEffect, useState } from "react";

const wsChannel = new WebSocket(
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
  const [messages, setMessages] = useState<chatMessageType[]>([]);

  useEffect(() => {
    wsChannel.addEventListener("message", (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    });
  }, []);

  return (
    <div style={{ height: "200px", overflowY: "auto" }}>
      {messages.map((m, index) => (
        <Message key={index} message={m} />
      ))}
    </div>
  );
};

const Message: React.FC<{ message: chatMessageType }> = ({ message }) => {
  //@ts-ignore
  // const message: chatMessageType = null;
  return (
    <div>
      <img src={message.photo} style={{ width: "30px" }} />
      <b>{message.userName}</b>

      <div>{message.message}</div>
      <hr />
    </div>
  );
};

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const [readyStatus, setReadyStatus] = useState<"pending" | "ready">(
    "pending"
  );

  useEffect(() => {
    wsChannel.addEventListener("open", () => {
      setReadyStatus("ready");
    });
  }, []);

  const sendMessage = () => {
    if (!message) {
      return;
    }
    wsChannel.send(message);
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
        <button disabled={readyStatus !== "ready"} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;

export type chatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
