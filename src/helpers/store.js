import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import rootReducer from "../redux/reducers";

export default createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
  )
);
