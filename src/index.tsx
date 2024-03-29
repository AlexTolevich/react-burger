import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {compose, createStore, applyMiddleware,} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {rootReducer} from './services/reducers';
import {socketMiddleware} from "./services/middleware/socketMiddleware";
import {wsActions, wsUserActions} from "./services/actions/socketMiddleware";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const WS_URL = 'wss://norma.nomoreparties.space/orders';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(
    thunk,
    socketMiddleware(WS_URL, wsUserActions),
    socketMiddleware(`${WS_URL}/all`, wsActions)
  )
);

export const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/react-burger">
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// @ts-ignore
if (window.Cypress) {
  // @ts-ignore
  window.testCyStore = store
}

// If you want to start measuring performance in your App, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
