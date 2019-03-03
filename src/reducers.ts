import { combineReducers } from "redux";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as actions from "./actions";

const appReducer = reducerWithInitialState({}).case(
  actions.submitForm,
  (state, payload) => ({
    ...state,
    data: { ...payload }
  })
);

const rootReducer = combineReducers({
  app: appReducer
});

export default rootReducer;
