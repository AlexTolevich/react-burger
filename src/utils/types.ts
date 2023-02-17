import {ReactNode} from "react";
import {store} from '..';

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

export interface IProtectedRouteProps{
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

export type TDispatch = typeof store.dispatch;

export type TLocationState = {
  from: {
    pathname: string;
  }
}

