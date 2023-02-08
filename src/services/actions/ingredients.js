import {getInrgedientsRequest} from "../../utils/Api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DEL_INGREDIENT = 'DEL_INGREDIENT';
export const RESET_INGREDIENTS = 'RESET_INGREDIENTS';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';

export function addIngredient(ingredient) {
  return {
    type: ADD_INGREDIENT,
    ingredient
  }
}

export function delIngredient(ingredient) {
  return {
    type: DEL_INGREDIENT,
    ingredient
  }
}

export function sortIngredient(dragElementId, dropElementId) {
  return {
    type: SORT_INGREDIENTS,
    dragElementId,
    dropElementId
  }
}

export function setActiveTab(value) {
  return {
    type: SET_ACTIVE_TAB,
    value
  }
}

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getInrgedientsRequest().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    });
  };
}

