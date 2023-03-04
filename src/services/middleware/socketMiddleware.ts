import type {Middleware, MiddlewareAPI} from 'redux';
import {AppDispatch, RootState, TApplicationActions} from "../../utils/types";
import {getCookie} from "../../utils/cookies";

export interface IWsAction {
  wsStart: string,
  wsStop: string,
  wsGetMessage: string,
  wsSuccess: string,
  wsClosed: string,
  wsError: string
}

export const socketMiddleware = (wsUrl: string, wsActions: any): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TApplicationActions) => {
      const {dispatch} = store;
      const {type} = action;

      const {wsStart, wsStop, wsGetMessage, wsSuccess, wsClosed, wsError} = wsActions
      if (type === wsStart) {
        socket = new WebSocket(
          wsUrl.includes('orders/all')
            ? wsUrl
            : `${wsUrl}?token=${getCookie('accessToken')}`);
      }
      if (socket) {
        if (type === wsStop) {
          socket.close();
        }

        socket.onopen = event => {
          dispatch({type: wsSuccess, payload: event});
        };

        socket.onerror = event => {
          dispatch({type: wsError, payload: event});
        };

        socket.onmessage = event => {
          const {data} = event;
          dispatch({type: wsGetMessage, payload: data});

          if (data === 'ping') {
            socket?.send('pong');
          }
        };

        socket.onclose = event => {
          dispatch({type: wsClosed, payload: event});
        };
      }
      next(action);
    };
  }) as Middleware;
};