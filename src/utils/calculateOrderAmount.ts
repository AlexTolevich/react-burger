import {IIngredient} from "./types";

export function calculateOrderAmount(order: IIngredient[]): number {
  return order ? (order.reduce(
    (acc, item) => acc = acc + (item.type === 'bun' ? (item.price * 2) : item.price),
    0
  )) : 0
}
