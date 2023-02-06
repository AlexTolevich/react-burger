export const getIngredientsFromStore = (state) => state.ingredients;
export const getBurger = (state) => state.burgerConstructor.burger;
export const getOrder = (state) => state.order;
export const getViewedIngredient = (state) => state.viewedIngredient.ingredient;
export const getForgotPSWDRequest = (state) => state.password.forgotPSWDRequest;
export const getResetPSWDRequest = (state) => state.password.resetPSWDRequest;
export const getUserRequest = (state) => state.user.userRequest;