import 'babel-polyfill';
import 'whatwg-fetch';
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import Page from '../src/Page.jsx';

const element = (
  <Router>
    <div>whatever</div>
  </Router>
);


ReactDOM.render(element, document.getElementById('contents'));

if (module.hot) { // accept changes made by HMR
  module.hot.accept();
}
