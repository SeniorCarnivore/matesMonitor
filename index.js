import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App';

const mountNode = document.getElementById("app");
ReactDOM.render(<App/>, mountNode);