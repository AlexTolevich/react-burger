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
    case POST_USER_REQUEST: {
      return {...state, userRequest: true};
    }
    case POST_USER_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        email: action.user.email,
        name: action.user.name,
        userRequest: false
      };
    }
    case POST_USER_FAILED: {
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

