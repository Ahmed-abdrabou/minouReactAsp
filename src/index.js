// import React from 'react';
// import ReactDOM from 'react-dom';

// import './index.css';
// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));

import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

const root = document.getElementById("root");
if (root !== null) {
  const rootElement = ReactDOM.createRoot(root);
  rootElement.render(<App />);
}
