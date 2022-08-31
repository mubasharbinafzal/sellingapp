import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const logger = (store) => {
  return (next) => {
    return (action) => { 
      const result = next(action); 
      return result;
    };
  };
}; 

export default createStore(
  rootReducer, 
  compose(applyMiddleware(logger, thunk)),
);

 