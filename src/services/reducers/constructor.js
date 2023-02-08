import {
  ADD_INGREDIENT,
  DEL_INGREDIENT,
  SORT_INGREDIENTS,
  RESET_INGREDIENTS
} from "../actions/ingredients";
import {CLOSE_ORDER, POST_ORDER_FAILED, POST_ORDER_REQUEST, POST_ORDER_SUCCESS} from "../actions/order";

const initialBurger = {
  burger: [],
};

const initialOrder = {
  orderRequest: false,
  orderFailed: false,
  order: 0
}

export const constructorReducer = (state = initialBurger, action) => {
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
      const dragElement = state.burger.find(item => item.id === action.dragElementId);
      const sortedBurger = state.burger.filter(item => item.id !== action.dragElementId);
      sortedBurger.splice(indexDropElement, 0, dragElement);
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

export const orderReducer = (state = initialOrder, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {...state, orderRequest: true};
    }
    case POST_ORDER_SUCCESS: {
      return {...state, orderFailed: false, order: action.order.number, orderRequest: false};
    }
    case POST_ORDER_FAILED: {
      return {...state, orderFailed: true, order: 0, orderRequest: false};
    }
    case CLOSE_ORDER: {
      return {orderFailed: false, order: 0, orderRequest: false};
    }
    default: {
      return state;
    }
  }
};
