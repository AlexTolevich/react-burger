import { combineReducers } from 'redux';
import {ingredientsReducer} from "./ingredients";
import {constructorReducer, orderReducer} from "./constructor";
import {PSWDReducer, userLoggedInReducer, userReducer} from "./user";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  user: userReducer,
  loggedIn: userLoggedInReducer,
  password: PSWDReducer,
});