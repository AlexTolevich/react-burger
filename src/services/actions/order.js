import {postOrder} from "../../utils/Api";
import {RESET_INGREDIENTS} from "./ingredients";

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const CLOSE_ORDER = 'CLOSE_ORDER';

export function submitOrder({ingredients}) {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST
    });
    postOrder({ingredients}).then(res => {
      if (res && res.success) {
        dispatch({
          type: POST_ORDER_SUCCESS,
          order: res.order
        });
        dispatch({type: RESET_INGREDIENTS});
      } else {
        dispatch({
          type: POST_ORDER_FAILED
        });
      }
    });
  };
}