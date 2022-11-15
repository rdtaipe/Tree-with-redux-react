import React from "react";
import ReactDom from "react-dom/client";
import store from "./Redux/Store";
import { Provider } from "react-redux";
import "./styles.css";
import { Tree } from "./Tree/Tree";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Tree />
  </Provider>
);
