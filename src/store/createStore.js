import { combineReducers, createStore, applyMiddleware } from "redux";
import transactionReducer from "./transactionReducer";
import currentuserReducer from "./currentuserReducer";
import transactionMiddleWare from "./middleware/transactionMiddleware";
//import { composeEnhancers } from "redux-devtools-extension";

const rootReducer = combineReducers({
  currentUser: currentuserReducer,
  transaction: transactionReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const preInitialState = () => {
  if (
    localStorage.getItem("transaction") &&
    JSON.stringify(localStorage.getItem("transaction"))
  ) {
    const newtransaction = JSON.parse(localStorage.getItem("transaction"));
    return { currentUser: "", transaction: newtransaction };
  } else {
    return { currentUser: "", transaction: {} };
  }
};

const store = createStore(
  rootReducer,
  preInitialState(),
  composeEnhancers(applyMiddleware(transactionMiddleWare))
);
export default store;
