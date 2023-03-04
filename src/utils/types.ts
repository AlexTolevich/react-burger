import {ReactNode} from "react";
import {store} from '..';
import {TAuthActions} from "../services/actions/auth";
import {TIngredientsActions} from "../services/actions/ingredients";
import {TOrderActions} from "../services/actions/order";

import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TWsActions} from "../services/actions/socketMiddleware";

export interface IIngredient {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly __v: number;
  readonly _id: string;
  id?: string;
}

export interface IModalOverlayProps {
  onClose: () => void,
  children: ReactNode
}

export interface IModalProps {
  onClose: () => void,
  children: ReactNode,
  title?: string | undefined
}

export interface IProtectedRouteProps {
  children: JSX.Element,
  anonymous?: boolean
}

export interface ITab {
  id: string,
  type: string,
  title: string
}

export interface IUserData {
  name: string,
  email: string,
  password: string,
  token: string
}

export interface IHeaders {
  [name: string]: string,
}

export interface IUseValidationState {
  [name: string]: string,
}

export interface IObj {
  type: string,
  distance: number,
}

export interface IOrderIngredients {
  ingredients: Array<string>,
}

export interface IOrder {
  readonly "ingredients": Array<IIngredient>;
  readonly "_id": string;
  readonly "owner": {
    readonly "name": string;
    readonly "email": string,
    readonly "createdAt": string,
    readonly "updatedAt": string
  };
  readonly "status": string;
  readonly "name": string;
  readonly "createdAt": string;
  readonly "updatedAt": string;
  readonly "number": number;
  readonly "price": number;
}

export interface IFeedOrderItem {
  readonly "_id": string;
  readonly "ingredients": Array<string>;
  readonly "status": string;
  readonly "name": string;
  readonly "createdAt": string;
  readonly "updatedAt": string;
  readonly "number": number;
}

export type TLocationState = {
  from: {
    pathname: string;
  }
}

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  | TAuthActions
  | TIngredientsActions
  | TOrderActions
  | TWsActions;

export type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, unknown, TApplicationActions>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

