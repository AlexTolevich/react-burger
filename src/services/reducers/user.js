import {
  POST_SIGNUP_REQUEST,
  POST_SIGNUP_SUCCESS,
  POST_SIGNUP_FAILED,
  USER_LOGGED_IN,
  USER_LOGGED_OUT, POST_LOGIN_REQUEST, POST_LOGIN_SUCCESS, POST_LOGIN_FAILED,
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

