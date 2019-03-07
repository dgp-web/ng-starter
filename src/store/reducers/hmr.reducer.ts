import {ActionReducer} from "@ngrx/store";
import {HmrReloadAction, hmrReloadActionType} from "../actions";

/**
 * Generate a reducer to set the root state in dev mode for HMR
 * @param {ActionReducer<any>} x
 * @returns {ActionReducer<any>}
 */
export function hmrReducer(x: ActionReducer<any>): ActionReducer<any> {

  return function (state: any, action: HmrReloadAction) {
    if (action.type === hmrReloadActionType) {
      return action.payload;
    }
    return x(state, action);
  };

}
