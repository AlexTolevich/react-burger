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
import {initialWSOrders, WSReducer, WSUserReducer} from "./wsReducers";

describe("WSReducer - receiving all orders", () => {
  it("initial state of the reducer", () => {
    // @ts-ignore
    expect(WSReducer(undefined, {})).toEqual(initialWSOrders);
  });

  it("starting a connection with WS", () => {
    expect(WSReducer(initialWSOrders, {type: WS_CONNECTION_START})).toEqual({
      ...initialWSOrders,
      connected: true
    });
  });

  it("WS connection success", () => {
    expect(WSReducer(initialWSOrders, {
      type: WS_CONNECTION_SUCCESS,
      payload: true
    })).toEqual({
      ...initialWSOrders,
      connected: true,
      isTrusted: true
    });
  });

  it("WS get messages", () => {
    expect(WSReducer(initialWSOrders, {
      type: WS_GET_MESSAGE,
      payload: {test: "ok"}
    })).toEqual({
      ...initialWSOrders,
      data: {test: "ok"}
    });
  });

  it("WS connection error", () => {
    expect(WSReducer(initialWSOrders, {
      type: WS_CONNECTION_ERROR,
      payload: {error: "500"}
    })).toEqual({
      ...initialWSOrders,
      error: {error: "500"}
    });
  });

  it("WS connection closed", () => {
    expect(WSReducer(initialWSOrders, {
      type: WS_CONNECTION_CLOSED,
      payload: false
    })).toEqual({
      ...initialWSOrders,
      connected: false,
      isTrusted: false
    });
  });

  it("WS connection stop", () => {
    expect(WSReducer(initialWSOrders, {
      type: WS_CONNECTION_STOP
    })).toEqual({
      connected: false,
      error: null,
      data: '',
      isTrusted: null
    });
  });
});

describe("WSUserReducer - receiving user orders", () => {
  it("initial state of the reducer", () => {
    // @ts-ignore
    expect(WSUserReducer(undefined, {})).toEqual(initialWSOrders);
  });

  it("starting a connection with user WS", () => {
    expect(WSUserReducer(initialWSOrders, {type: WS_USER_CONNECTION_START})).toEqual({
      ...initialWSOrders,
      connected: true
    });
  });

  it("WS connection success", () => {
    expect(WSUserReducer(initialWSOrders, {
      type: WS_USER_CONNECTION_SUCCESS,
      payload: true
    })).toEqual({
      ...initialWSOrders,
      connected: true,
      isTrusted: true
    });
  });

  it("WS get messages", () => {
    expect(WSUserReducer(initialWSOrders, {
      type: WS_USER_GET_MESSAGE,
      payload: {test: "ok"}
    })).toEqual({
      ...initialWSOrders,
      data: {test: "ok"}
    });
  });

  it("WS connection error", () => {
    expect(WSUserReducer(initialWSOrders, {
      type: WS_USER_CONNECTION_ERROR,
      payload: {error: "500"}
    })).toEqual({
      ...initialWSOrders,
      error: {error: "500"}
    });
  });

  it("WS connection closed", () => {
    expect(WSUserReducer(initialWSOrders, {
      type: WS_USER_CONNECTION_CLOSED,
      payload: false
    })).toEqual({
      ...initialWSOrders,
      connected: false,
      isTrusted: false
    });
  });

  it("WS connection stop", () => {
    expect(WSUserReducer(initialWSOrders, {
      type: WS_USER_CONNECTION_STOP
    })).toEqual({
      connected: false,
      error: null,
      data: '',
      isTrusted: null
    });
  });
});
