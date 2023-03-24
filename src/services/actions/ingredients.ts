import {onGetIngredientsRequest} from "../../utils/Api";
import {AppDispatch, AppThunk, IIngredient} from "../../utils/types";
import {
  ADD_INGREDIENT,
  DEL_INGREDIENT,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  RESET_INGREDIENTS,
  SET_ACTIVE_TAB,
  SORT_INGREDIENTS
} from "../constants";

export interface IResetIngredients {
  readonly type: typeof RESET_INGREDIENTS;
}

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: IIngredient;
}

export interface IDelIngredient {
  readonly type: typeof DEL_INGREDIENT;
  readonly ingredient: IIngredient;
}

export interface ISortIngredient {
  readonly type: typeof SORT_INGREDIENTS;
  readonly dragElementId: string;
  readonly dropElementId: string;
}

export interface ISetActiveTab {
  readonly type: typeof SET_ACTIVE_TAB;
  readonly value: string;
}

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: IIngredient[];
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions =
  | IResetIngredients
  | IAddIngredient
  | IDelIngredient
  | ISortIngredient
  | ISetActiveTab
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed;

export function resetIngredients(): IResetIngredients {
  return {type: RESET_INGREDIENTS}
}

export function addIngredient(ingredient: IIngredient): IAddIngredient {
  return {
    type: ADD_INGREDIENT,
    ingredient
  }
}

export function delIngredient(ingredient: IIngredient): IDelIngredient {
  return {
    type: DEL_INGREDIENT,
    ingredient
  }
}

export function sortIngredient(dragElementId: string, dropElementId: string): ISortIngredient {
  return {
    type: SORT_INGREDIENTS,
    dragElementId,
    dropElementId
  }
}

export function setActiveTab(value: string): ISetActiveTab {
  return {
    type: SET_ACTIVE_TAB,
    value
  }
}

export function getIngredientsRequest(): IGetIngredientsRequest {
  return {type: GET_INGREDIENTS_REQUEST}
}

export function getIngredientsSuccess(data: IIngredient[]): IGetIngredientsSuccess {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: data,
  }
}

export function getIngredientsFailed(): IGetIngredientsFailed {
  return {type: GET_INGREDIENTS_FAILED}
}

export const getIngredients = (): AppThunk => {
  return function (dispatch) {
    dispatch(getIngredientsRequest());
    onGetIngredientsRequest().then(res => {
      if (res && res.success) {
        dispatch(getIngredientsSuccess(res.data));
      } else {
        dispatch(getIngredientsFailed());
      }
    });
  };
}