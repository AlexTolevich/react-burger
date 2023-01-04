import {ADD_INGREDIENT, DEL_INGREDIENT, POST_ORDER_REQUEST, POST_ORDER_SUCCESS, POST_ORDER_FAILED} from "../actions";
import {v4 as uuidv4} from "uuid";

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
          [...state.burger.filter(item => item.type !== 'bun'), {...action.ingredient, id: uuidv4()}] :
          [...state.burger, {...action.ingredient, id: uuidv4()}]
      };
    }
    case
    DEL_INGREDIENT: {
      return {...state, burger: [...state.burger.filter(item => item.id !== action.ingredient?.id)]};
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
      return {...state, orderFailed: true, orderRequest: false};
    }
    default: {
      return state;
    }
  }
};
