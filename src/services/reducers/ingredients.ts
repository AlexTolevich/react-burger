import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  SET_ACTIVE_TAB
} from "../constants";
import {TIngredientsActions} from "../actions/ingredients";
import {IIngredient} from "../../utils/types";

type TIngredientsState = {
  ingredients: Array<IIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  activeTab: string;
};

const initialIngredients: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  activeTab: 'bun',
};

export const ingredientsReducer = (state = initialIngredients, action: TIngredientsActions): TIngredientsState => {
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
