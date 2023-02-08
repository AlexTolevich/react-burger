import {getInrgedientsRequest} from "../../utils/Api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const ADD_VIEWED_INGREDIENT = 'ADD_VIEWED_INGREDIENT';
export const DEL_VIEWED_INGREDIENT = 'DEL_VIEWED_INGREDIENT';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DEL_INGREDIENT = 'DEL_INGREDIENT';
export const RESET_INGREDIENTS = 'RESET_INGREDIENTS';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';


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
