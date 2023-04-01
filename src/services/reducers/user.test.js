import {
  FORGOT_PSWD_FAILED,
  FORGOT_PSWD_REQUEST,
  FORGOT_PSWD_SUCCESS,
  POST_USER_REQUEST,
  POST_USER_FAILED,
  POST_USER_SUCCESS,
  RESET_PSWD_FAILED,
  RESET_PSWD_REQUEST,
  RESET_PSWD_SUCCESS,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from "../constants";

import {
  userReducer,
  PSWDReducer,
  userLoggedInReducer,
  initialUser,
  initialPSWDRecover,
  initialLoggedInUser
} from "./user";

describe("user data sending reducers test", () => {
  it("initial state of the reducer", () => {
    expect(userReducer(undefined, {})).toEqual(initialUser);
  });

  it("the beginning of the post request", () => {
    expect(userReducer(initialUser, {
      type: POST_USER_REQUEST
    })).toEqual({
      ...initialUser,
      userRequest: true
    });
  });

  it("post request successful", () => {
    expect(userReducer(initialUser, {
      type: POST_USER_SUCCESS,
      user: {email: "testOK", name: "testOK"}
    })).toEqual({
      userFailed: false,
      userRequest: false,
      email: "testOK",
      name: "testOK"
    });
  });

  it("post request failed", () => {
    expect(userReducer(initialUser, {
      type: POST_USER_FAILED
    })).toEqual({
      ...initialUser,
      userFailed: true,
      userRequest: false
    });
  });
});

describe("login status reducers test", () => {
  it("initial state of the reducer", () => {
    expect(userLoggedInReducer(undefined, {})).toEqual(initialLoggedInUser);
  });

  it("user logged in", () => {
    expect(userLoggedInReducer(initialLoggedInUser, {
      type: USER_LOGGED_IN
    })).toEqual({loggedIn: true});
  });

  it("user logged out", () => {
    expect(userLoggedInReducer(initialLoggedInUser, {
      type: USER_LOGGED_OUT
    })).toEqual({loggedIn: false});
  });
});

describe("password recovery and reset reducers tests", () => {
  it("initial state of the reducer", () => {
    expect(PSWDReducer(undefined, {})).toEqual(initialPSWDRecover);
  });

  it("the beginning of the forgot PSWD request", () => {
    expect(PSWDReducer(initialPSWDRecover, {
      type: FORGOT_PSWD_REQUEST
    })).toEqual({
      ...initialPSWDRecover,
      forgotPSWDRequest: true
    });
  });

  it("forgot PSWD request successful", () => {
    expect(PSWDReducer(initialPSWDRecover, {
      type: FORGOT_PSWD_SUCCESS
    })).toEqual({
      ...initialPSWDRecover,
      forgotPSWDRequest: false,
      forgotPSWD: true,
    });
  });

  it("forgot PSWD request failed", () => {
    expect(PSWDReducer(initialPSWDRecover, {
      type: FORGOT_PSWD_FAILED
    })).toEqual({
      ...initialPSWDRecover,
      forgotPSWDRequest: false,
      forgotPSWD: false,
      forgotPSWDFailed: true
    });
  });

  it("the beginning of the reset PSWD request", () => {
    expect(PSWDReducer(initialPSWDRecover, {
      type: RESET_PSWD_REQUEST
    })).toEqual({
      ...initialPSWDRecover,
      resetPSWDRequest: true,
      forgotPSWD: false,
    });
  });

  it("reset PSWD request successful", () => {
    expect(PSWDReducer(initialPSWDRecover, {
      type: RESET_PSWD_SUCCESS
    })).toEqual({
      ...initialPSWDRecover,
      resetPSWDRequest: false,
      resetPSWD: true,
    });
  });

  it("reset PSWD request failed", () => {
    expect(PSWDReducer(initialPSWDRecover, {
      type: RESET_PSWD_FAILED
    })).toEqual({
      ...initialPSWDRecover,
      resetPSWDRequest: false,
      resetPSWD: false,
      resetPSWDFailed: true,
    });
  });
});

