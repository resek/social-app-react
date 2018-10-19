import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter }  from "react-router-dom";
import {Provider} from "mobx-react";
import Store from "./stores/Store";
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider Store={Store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
