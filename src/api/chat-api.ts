const subscribers = {
  "messages-received": [] as messagesReceivedSubscriberType[],
  "status-changed": [] as statusChangedSubscriberType[],
};

let ws: WebSocket | null = null;

const closeHandler = () => {
  notifySubscriberAboutStatus("pending");
  setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers["messages-received"].forEach((s) => s(newMessages));
};

const openHandler = () => {
  notifySubscriberAboutStatus("ready");
};

const errorHandler = () => {
  notifySubscriberAboutStatus("error");
  console.error("REFRESH PAGE");
};

const cleanup = () => {
  ws?.removeEventListener("close", closeHandler);
  ws?.removeEventListener("message", messageHandler);
  ws?.removeEventListener("open", openHandler);
  ws?.removeEventListener("error", errorHandler);
};

const notifySubscriberAboutStatus = (status: statusType) => {
  subscribers["status-changed"].forEach((s) => s(status));
};

function createChannel() {
  cleanup();
  ws?.close();

  ws = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  notifySubscriberAboutStatus("pending");
  ws.addEventListener("close", closeHandler);
  ws.addEventListener("message", messageHandler);
  ws.addEventListener("open", openHandler);
  ws.addEventListener("error", errorHandler);
}

export const chatAPI = {
  start() {
    createChannel();
  },
  stop() {
    subscribers["messages-received"] = [];
    subscribers["status-changed"] = [];
    cleanup();
    ws?.close();
  },
  subscribe(
    eventName: eventsNamesType,
    callback: messagesReceivedSubscriberType | statusChangedSubscriberType
  ) {
    // @ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(
        // @ts-ignore
        (s) => s !== callback
      );
    };
  },
  unsubscribe(
    eventName: eventsNamesType,
    callback: messagesReceivedSubscriberType | statusChangedSubscriberType
  ) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(
      // @ts-ignore
      (s) => s !== callback
    );
  },

  sendMessage(message: string) {
    ws?.send(message);
  },
};

export type chatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

type subscriberType = (messages: chatMessageType[]) => void;
type eventsNamesType = "messages-received" | "status-changed";
type messagesReceivedSubscriberType = (messages: chatMessageType[]) => void;
type statusChangedSubscriberType = (status: statusType) => void;

export type statusType = "pending" | "ready" | "error";
