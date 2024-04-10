import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import kanbanReducer from "./reducer";
import {thunk} from "redux-thunk";

export const  store = createStore(kanbanReducer, applyMiddleware(thunk))