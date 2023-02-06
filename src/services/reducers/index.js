import { combineReducers } from 'redux';
import {ingredientsReducer, viewedIngredientReducer} from "./ingredients";
import {constructorReducer, orderReducer} from "./constructor";
import {PSWDReducer, userLoggedInReducer, userReducer} from "./user";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  viewedIngredient: viewedIngredientReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  user: userReducer,
  loggedIn: userLoggedInReducer,
  password: PSWDReducer,
});