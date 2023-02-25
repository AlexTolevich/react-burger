import {postOrder} from "../../utils/Api";
import {
  CLOSE_ORDER,
  POST_ORDER_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  RESET_INGREDIENTS
} from "../constants";
import {IOrder, IOrderIngredients} from "../../utils/types";

export interface ICloseOrder {
  readonly type: typeof CLOSE_ORDER;
}

export interface IPostOrderRequest {
  readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderSuccess {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly order: IOrder;
}

export interface IPostOrderFailed {
  readonly type: typeof POST_ORDER_FAILED;
}

export interface IResetIngredients {
  readonly type: typeof RESET_INGREDIENTS;
}

export type TOrderActions =
  | ICloseOrder
  | IPostOrderRequest
  | IPostOrderSuccess
  | IPostOrderFailed
  | IResetIngredients;

export function closeOrder(): ICloseOrder {
  return {type: CLOSE_ORDER}
}

export function postOrderRequest(): IPostOrderRequest {
  return {type: POST_ORDER_REQUEST}
}

export function postOrderSuccess(order: IOrder): IPostOrderSuccess {
  return {
    type: POST_ORDER_SUCCESS,
    order
  }
}

export function postOrderFailed(): IPostOrderFailed {
  return {type: POST_ORDER_FAILED}
}

export function resetIngredients(): IResetIngredients {
  return {type: RESET_INGREDIENTS}
}

export function submitOrder({ingredients}: IOrderIngredients) {
  return function (dispatch: (arg0: IPostOrderRequest | IPostOrderSuccess | IPostOrderFailed | IResetIngredients) => void) {
    dispatch(postOrderRequest());
    postOrder({ingredients}).then(res => {
      if (res && res.success) {
        dispatch(postOrderSuccess(res.order));
        dispatch(resetIngredients());
      } else {
        dispatch(postOrderFailed());
      }
    });
  };
}