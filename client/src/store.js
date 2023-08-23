import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { userReducer } from "./reducers/userReducers";


let rootReducer = combineReducers({
    userState: userReducer,

});

const initialState = {
  userState: {},

};

const middleware = [thunk];

let store = createStore(
  rootReducer,
  initialState,


  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
