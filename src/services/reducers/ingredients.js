import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  ADD_VIEWED_INGREDIENT,
  DEL_VIEWED_INGREDIENT,
  SET_ACTIVE_TAB
} from "../actions/ingredients";

const initialIngredients = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  activeTab: 'bun',
};

const initialIngredient = {
  ingredient: {},
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

export const viewedIngredientReducer = (state = initialIngredient, action) => {
  switch (action.type) {
    case ADD_VIEWED_INGREDIENT: {
      return {...state, ingredient: action.ingredient};
    }
    case DEL_VIEWED_INGREDIENT: {
      return {...state, ingredient: null};
    }
    default: {
      return state;
    }
  }
};