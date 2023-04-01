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

import {initialBurger, initialOrder, constructorReducer, orderReducer} from "./constructor";

describe("burger constructor reducers test", () => {
  const testIngredient = {
    "_id": "60d3b41abdacab0026a733c7",
    "name": "Флюоресцентная булка R2-D3",
    "type": "bun",
    "proteins": 44,
    "fat": 26,
    "carbohydrates": 85,
    "calories": 643,
    "price": 988,
    "image": "https://code.s3.yandex.net/react/code/bun-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
    "__v": 0
  };

  it("initial state of the reducer", () => {
    expect(constructorReducer(undefined, {})).toEqual(initialBurger);
  });

  it("add burger ingredient - not bun", () => {
    expect(constructorReducer(initialBurger, {
      type: ADD_INGREDIENT,
      ingredient: {...testIngredient, type: "filling"}
    })).toEqual({
      ...initialBurger,
      burger: [{...testIngredient, type: "filling"}]
    });
  });

  it("add a burger ingredient - bun (there is no bun in the burger)", () => {
    expect(constructorReducer(initialBurger, {
      type: ADD_INGREDIENT,
      ingredient: testIngredient
    })).toEqual({
      ...initialBurger,
      burger: [testIngredient]
    });
  });

  it("add a burger ingredient - bun (there is bun in the burger)", () => {
    expect(constructorReducer({...initialBurger, burger: [{type: "bun", name: "test bun"}]}, {
      type: ADD_INGREDIENT,
      ingredient: testIngredient
    })).toEqual({
      ...initialBurger,
      burger: [testIngredient]
    });
  });

  it("remove the ingredient from the burger", () => {
    expect(constructorReducer({...initialBurger, burger: [{id: 1}, {id: 2}]}, {
      type: DEL_INGREDIENT,
      ingredient: {id: 1}
    })).toEqual({
      ...initialBurger,
      burger: [{id: 2}]
    });
  });

  it("remove all ingredients from the burger", () => {
    expect(constructorReducer({...initialBurger, burger: [{id: 1}, {id: 2}]}, {
      type: RESET_INGREDIENTS
    })).toEqual({
      ...initialBurger,
      burger: []
    });
  });

  it("sort ingredients from the burger", () => {
    expect(constructorReducer({...initialBurger, burger: [{id: 1}, {id: 3}, {id: 2}]}, {
      type: SORT_INGREDIENTS,
      dragElementId: 2,
      dropElementId: 3
    })).toEqual({
      ...initialBurger,
      burger: [{id: 1}, {id: 2}, {id: 3}]
    });
  });
});

describe("burger constructor reducers test", () => {
  const testOrder = {
    "ingredients": [
      {
        "_id": "60d3b41abdacab0026a733c7",
        "name": "Флюоресцентная булка R2-D3",
        "type": "bun",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/bun-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
        "__v": 0
      },
      {
        "_id": "60d3b41abdacab0026a733c9",
        "name": "Мясо бессмертных моллюсков Protostomia",
        "type": "main",
        "proteins": 433,
        "fat": 244,
        "carbohydrates": 33,
        "calories": 420,
        "price": 1337,
        "image": "https://code.s3.yandex.net/react/code/meat-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
        "__v": 0
      }
    ],
    "_id": "64284f8b0905fd001b625f71",
    "owner": {
      "name": "а нет блин б",
      "email": "fxxdtn@drhjvdedtguj.ry",
      "createdAt": "2023-03-05T12:17:16.260Z",
      "updatedAt": "2023-03-05T12:17:16.260Z"
    },
    "status": "done",
    "name": "Бессмертный флюоресцентный бургер",
    "createdAt": "2023-04-01T15:36:43.372Z",
    "updatedAt": "2023-04-01T15:36:43.902Z",
    "number": 47291,
    "price": 2325
  };

  it("initial state of the reducer", () => {
    expect(orderReducer(undefined, {})).toEqual(initialOrder);
  });

  it("the beginning of the post order request", () => {
    expect(orderReducer(initialOrder, {
      type: POST_ORDER_REQUEST
    })).toEqual({
      ...initialOrder,
      orderRequest: true
    });
  });

  it("post order request successful", () => {
    expect(orderReducer(initialOrder, {
      type: POST_ORDER_SUCCESS,
      order: testOrder
    })).toEqual({
      ...initialOrder,
      orderFailed: false,
      order: testOrder.number,
      orderRequest: false
    });
  });

  it("post order request failed", () => {
    expect(orderReducer(initialOrder, {
      type: POST_ORDER_FAILED
    })).toEqual({
      orderFailed: true,
      order: 0,
      orderRequest: false
    });
  });

  it("close order", () => {
    expect(orderReducer(initialOrder, {
      type: CLOSE_ORDER
    })).toEqual({
      orderFailed: false,
      order: 0,
      orderRequest: false
    });
  });
});