import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  SET_ACTIVE_TAB,
} from "../constants";

import {initialIngredients, ingredientsReducer} from "./ingredients";

describe("test reducers getting and displaying a list of ingredients", () => {
  const testIngredients = [
    {
      "_id": "60d3b41abdacab0026a733c6",
      "name": "Краторная булка N-200i",
      "type": "bun",
      "proteins": 80,
      "fat": 24,
      "carbohydrates": 53,
      "calories": 420,
      "price": 1255,
      "image": "https://code.s3.yandex.net/react/code/bun-02.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
      "__v": 0
    },
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
    }
  ];

  it("initial state of the reducer", () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialIngredients);
  });

  it("the beginning of the get ingredients request", () => {
    expect(ingredientsReducer(initialIngredients, {
      type: GET_INGREDIENTS_REQUEST
    })).toEqual({
      ...initialIngredients,
      ingredientsRequest: true
    });
  });

  it("get ingredients request successful", () => {
    expect(ingredientsReducer(initialIngredients, {
      type: GET_INGREDIENTS_SUCCESS,
      ingredients: testIngredients
    })).toEqual({
      ...initialIngredients,
      ingredients: testIngredients,
      ingredientsFailed: false,
      ingredientsRequest: false
    });
  });

  it("get ingredients request failed", () => {
    expect(ingredientsReducer(initialIngredients, {
      type: GET_INGREDIENTS_FAILED
    })).toEqual({
      ...initialIngredients,
      ingredientsFailed: true,
      ingredients: [],
      ingredientsRequest: false
    });
  });

  it("set active tab", () => {
    expect(ingredientsReducer(initialIngredients, {
      type: SET_ACTIVE_TAB,
      value: "testTabOK"
    })).toEqual({
      ...initialIngredients,
      activeTab: "testTabOK"
    });
  });
});