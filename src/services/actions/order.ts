import {postOrder} from "../../utils/Api";
import {CLOSE_ORDER, POST_ORDER_FAILED, POST_ORDER_REQUEST, POST_ORDER_SUCCESS} from "../constants";
import {AppDispatch, AppThunk, IOrder, IOrderIngredients} from "../../utils/types";
import {resetIngredients} from "./ingredients";

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

export type TOrderActions =
  | ICloseOrder
  | IPostOrderRequest
  | IPostOrderSuccess
  | IPostOrderFailed;

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

export const submitOrder = ({ingredients}: IOrderIngredients): AppThunk => {
  return function (dispatch) {
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