import {RootState} from "../../utils/types";

export const getIngredientsFromStore = (state: RootState) => state.ingredients;
export const getBurger = (state: RootState) => state.burgerConstructor.burger;
export const getOrder = (state: RootState) => state.order;
export const getForgotPSWDRequest = (state: RootState) => state.password.forgotPSWDRequest;
export const getResetPSWDRequest = (state: RootState) => state.password.resetPSWDRequest;
export const getUserRequest = (state: RootState) => state.user.userRequest;
export const getUser = (state: RootState) => state.user;
export const getLoggedIn = (state: RootState) => state.loggedIn.loggedIn;
export const getForgotPSWD = (state: RootState) => state.password.forgotPSWD;
