let subscribers = [] as Array<subscriberType>;

let ws: WebSocket;

const closeHandler = () => {
  console.log("CLOSE WS");
  setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers.forEach((s) => s(newMessages));
};

function createChannel() {
  ws?.removeEventListener("close", closeHandler);
  ws?.close();

  ws = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  ws.addEventListener("close", closeHandler);
}

export const chatAPI = {
  subscribe(callback: subscriberType) {
    subscribers.push(callback);

    //you can make so...
    return () => {
      subscribers = subscribers.filter((s) => s !== callback);
    };
  },

  //...or so
  unsubscribe(callback: subscriberType) {
    subscribers = subscribers.filter((s) => s !== callback);
  },
};

export type chatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

type subscriberType = (messages: chatMessageType[]) => void;
