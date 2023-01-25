import { combineReducers } from 'redux';
import {ingredientsReducer, viewedIngredientReducer} from "./ingredients";
import {constructorReducer, orderReducer} from "./constructor";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  viewedIngredient: viewedIngredientReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
});