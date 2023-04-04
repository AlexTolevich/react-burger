import {
  ADD_INGREDIENT,
  CLOSE_ORDER,
  DEL_INGREDIENT,
  POST_ORDER_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  RESET_INGREDIENTS,
  SORT_INGREDIENTS
} from "../constants";
import {TIngredientsActions} from "../actions/ingredients";
import {TOrderActions} from "../actions/order";
import {IIngredient} from "../../utils/types";

type TBurgerState = {
  burger: Array<IIngredient>;
}

type TOrderState = {
  orderRequest: boolean;
  orderFailed: boolean;
  order: number;
}

export const initialBurger: TBurgerState = {
  burger: [],
};

export const initialOrder: TOrderState = {
  orderRequest: false,
  orderFailed: false,
  order: 0
}

export const constructorReducer = (state = initialBurger, action: TIngredientsActions): TBurgerState => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        burger: action.ingredient.type === 'bun' ?
          [...state.burger.filter(item => item.type !== 'bun'), {...action.ingredient}] :
          [...state.burger, {...action.ingredient}]
      };
    }
    case DEL_INGREDIENT: {
      return {...state, burger: [...state.burger.filter(item => item.id !== action.ingredient?.id)]};
    }
    case RESET_INGREDIENTS: {
      return {burger: []};
    }
    case SORT_INGREDIENTS: {
      const indexDropElement = state.burger.findIndex(item => item.id === action.dropElementId);
      const dragElement: IIngredient | undefined = state.burger.find(item => item.id === action.dragElementId);
      const sortedBurger = state.burger.filter(item => item.id !== action.dragElementId);
      if (dragElement) {
        sortedBurger.splice(indexDropElement, 0, dragElement);
      }
      return {
        ...state,
        burger: sortedBurger,
      };
    }
    default: {
      return state;
    }
  }
};

export const orderReducer = (state = initialOrder, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {...state, orderRequest: true};
    }
    case POST_ORDER_SUCCESS: {
      return {orderFailed: false, order: action.order.number, orderRequest: false};
    }
    case POST_ORDER_FAILED: {
      return {orderFailed: true, order: 0, orderRequest: false};
    }
    case CLOSE_ORDER: {
      return {orderFailed: false, order: 0, orderRequest: false};
    }
    default: {
      return state;
    }
  }
};
