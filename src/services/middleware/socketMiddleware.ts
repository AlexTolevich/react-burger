import type {AnyAction, Middleware, MiddlewareAPI} from 'redux';
import {AppDispatch, RootState} from "../../utils/types";

export interface IWsAction {
  wsStart: any,
  wsStop: any,
  wsGetMessage: any,
  wsSuccess: any,
  wsClosed: any,
  wsError: any
}

export const socketMiddleware = (wsUrl: string, wsActions: IWsAction): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: AnyAction) => {
      const {dispatch} = store;
      const {type, payload} = action;
      const {wsStart, wsStop, wsGetMessage, wsSuccess, wsClosed, wsError} = wsActions

      if (type === wsStart) {
        socket = new WebSocket(`${wsUrl}${payload ? payload : ''}`);
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