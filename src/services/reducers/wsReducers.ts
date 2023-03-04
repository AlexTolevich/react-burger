import {TWsActions} from "../actions/socketMiddleware";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_START, WS_USER_CONNECTION_STOP,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_GET_MESSAGE
} from "../constants/wsAction";

type TWSOrdersState = {
  connected: boolean;
  data: string;
  error: Event | null;
  isTrusted: Event | null;
};

const initialWSOrders: TWSOrdersState = {
  connected: false,
  data: '',
  error: null,
  isTrusted: null,
}

export const WSReducer = (state = initialWSOrders, action: TWsActions): TWSOrdersState => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {...state, connected: true};
    }
    case WS_CONNECTION_SUCCESS: {
      return {...state, connected: true, isTrusted: action.payload};
    }
    case WS_GET_MESSAGE: {
      return {...state, data: action.payload};
    }
    case WS_CONNECTION_ERROR: {
      return {...state, connected: false, error: action.payload};
    }
    case WS_CONNECTION_CLOSED: {
      return {...state, connected: false, isTrusted: action.payload};
    }
    case WS_CONNECTION_STOP: {
      return {connected: false, error: null, data: '', isTrusted: null};
    }
    default: {
      return state;
    }
  }
};

export const WSUserReducer = (state = initialWSOrders, action: TWsActions): TWSOrdersState => {
  switch (action.type) {
    case WS_USER_CONNECTION_START: {
      return {...state, connected: true};
    }
    case WS_USER_CONNECTION_SUCCESS: {
      return {...state, connected: true, isTrusted: action.payload};
    }
    case WS_USER_GET_MESSAGE: {
      return {...state, data: action.payload};
    }
    case WS_USER_CONNECTION_ERROR: {
      return {...state, connected: false, error: action.payload};
    }
    case WS_USER_CONNECTION_CLOSED: {
      return {...state, connected: false, isTrusted: action.payload};
    }
    case WS_USER_CONNECTION_STOP: {
      return {connected: false, error: null, data: '', isTrusted: null};
    }
    default: {
      return state;
    }
  }
};