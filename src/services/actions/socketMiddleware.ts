import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_STOP,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_GET_MESSAGE
} from "../constants/wsAction";

export interface IWsStart {
  readonly type: typeof WS_CONNECTION_START | typeof WS_USER_CONNECTION_START;
}

export interface IWsStop {
  readonly type: typeof WS_CONNECTION_STOP | typeof WS_USER_CONNECTION_STOP;
}

export interface IWsSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS | typeof WS_USER_CONNECTION_SUCCESS;
  readonly  payload: Event;
}

export interface IWsError {
  readonly type: typeof WS_CONNECTION_ERROR | typeof WS_USER_CONNECTION_ERROR;
  readonly  payload: Event;
}

export interface IWsClosed {
  readonly type: typeof WS_CONNECTION_CLOSED | typeof WS_USER_CONNECTION_CLOSED;
  readonly payload: CloseEvent;
}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE | typeof WS_USER_GET_MESSAGE;
  readonly  payload: string;
}

export type TWsActions =
  | IWsStart
  | IWsStop
  | IWsSuccess
  | IWsError
  | IWsClosed
  | IWsGetMessage;

export const wsActions = {
  wsStart: WS_CONNECTION_START,
  wsStop: WS_CONNECTION_STOP,
  wsGetMessage: WS_GET_MESSAGE,
  wsSuccess: WS_CONNECTION_SUCCESS,
  wsClosed: WS_CONNECTION_CLOSED,
  wsError: WS_CONNECTION_ERROR
};

export const wsUserActions = {
  wsStart: WS_USER_CONNECTION_START,
  wsStop: WS_USER_CONNECTION_STOP,
  wsGetMessage: WS_USER_GET_MESSAGE,
  wsSuccess: WS_USER_CONNECTION_SUCCESS,
  wsClosed: WS_USER_CONNECTION_CLOSED,
  wsError: WS_USER_CONNECTION_ERROR
};