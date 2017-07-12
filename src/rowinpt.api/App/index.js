import React from "react";
import ReactDom from "react-dom";

import Moment from "moment";

import "../node_modules/bootstrap/scss/bootstrap.scss";
import "../node_modules/font-awesome/scss/font-awesome.scss";
import "./styles/app.scss";

import ConfigureStore from "./store/configureStore";
import Root from "./components/Root";

Moment.locale("nl");

const store = ConfigureStore();

ReactDom.render(
    <Root store={store} />,
    document.getElementById("app")
);