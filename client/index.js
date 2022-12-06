import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";
// import { FiberProvider } from "its-fine";

ReactDOM.render(
  // <FiberProvider>
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  // </FiberProvider>,
  document.getElementById("app")
);
