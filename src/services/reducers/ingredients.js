import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  SET_ACTIVE_TAB
} from "../actions/ingredients";

const initialIngredients = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  activeTab: 'bun',
};

export const ingredientsReducer = (state = initialIngredients, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {...state, ingredientsRequest: true};
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {...state, ingredientsFailed: false, ingredients: action.ingredients, ingredientsRequest: false};
    }
    case GET_INGREDIENTS_FAILED: {
      return {...state, ingredientsFailed: true, ingredients: [], ingredientsRequest: false};
    }
    case SET_ACTIVE_TAB: {
      return {...state, activeTab: action.value,};
    }
    default: {
      return state;
    }
  }
};
