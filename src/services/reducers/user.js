import {
  POST_SIGNUP_REQUEST,
  POST_SIGNUP_SUCCESS,
  POST_SIGNUP_FAILED,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILED,
  POST_LOGOUT_REQUEST,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_FAILED,
  FORGOT_PSWD_REQUEST,
  FORGOT_PSWD_SUCCESS,
  FORGOT_PSWD_FAILED,
  RESET_PSWD_REQUEST,
  RESET_PSWD_SUCCESS,
  RESET_PSWD_FAILED
} from "../actions";

const initialUser = {
  email: '',
  name: '',
  userRequest: false,
  userFailed: false,
}

const initialLoggedInUser = {
  loggedIn: false,
}

const initialPSWDRecover = {
  forgotPSWDRequest: false,
  forgotPSWDFailed: false,
  resetPSWDRequest: false,
  resetPSWDFailed: false,
  forgotPSWD: false,
  resetPSWD: false,
}

export const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    case POST_SIGNUP_REQUEST: {
      return {...state, userRequest: true};
    }
    case POST_SIGNUP_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        email: action.user.email,
        name: action.user.name,
        userRequest: false
      };
    }
    case POST_SIGNUP_FAILED: {
      return {...state, userFailed: true, userRequest: false};
    }
    case POST_LOGIN_REQUEST: {
      return {...state, userRequest: true};
    }
    case POST_LOGIN_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        email: action.user.email,
        name: action.user.name,
        userRequest: false
      };
    }
    case POST_LOGIN_FAILED: {
      return {...state, userFailed: true, userRequest: false};
    }
    case POST_LOGOUT_REQUEST: {
      return {...state, userRequest: true};
    }
    case POST_LOGOUT_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        email: action.user.email,
        name: action.user.name,
        userRequest: false
      };
    }
    case POST_LOGOUT_FAILED: {
      return {...state, userFailed: true, userRequest: false};
    }
    default: {
      return state;
    }
  }
};

export const userLoggedInReducer = (state = initialLoggedInUser, action) => {
  switch (action.type) {
    case USER_LOGGED_IN: {
      return {loggedIn: true};
    }
    case USER_LOGGED_OUT: {
      return {loggedIn: false};
    }
    default: {
      return state;
    }
  }
};

export const PSWDReducer = (state = initialPSWDRecover, action) => {
  switch (action.type) {
    case FORGOT_PSWD_REQUEST: {
      return {...state, forgotPSWDRequest: true};
    }
    case FORGOT_PSWD_SUCCESS: {
      return {
        ...state,
        forgotPSWDRequest: false,
        forgotPSWD: true,
      };
    }
    case FORGOT_PSWD_FAILED: {
      return {
        ...state,
        forgotPSWDRequest: false,
        forgotPSWD: false,
        forgotPSWDFailed: true,
      };
    }
    case RESET_PSWD_REQUEST: {
      return {
        ...state,
        resetPSWDRequest: true,
        forgotPSWD: false,
      };
    }
    case RESET_PSWD_SUCCESS: {
      return {
        ...state,
        resetPSWDRequest: false,
        resetPSWD: true,
      };
    }
    case RESET_PSWD_FAILED: {
      return {
        ...state,
        resetPSWDRequest: false,
        resetPSWD: false,
        resetPSWDFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};

