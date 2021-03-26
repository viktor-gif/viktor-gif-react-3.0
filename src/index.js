import React from "react";
import state, { addPost, changePost, subscribe } from "./redux/state";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import state, { addPost } from "./redux/state";

export const renderEntireTree = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App state={state} addPost={addPost} changePost={changePost} />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

renderEntireTree();
subscribe(renderEntireTree);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
