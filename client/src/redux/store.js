import { createStore } from "redux";
import pokemon from "./reducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import { applyMiddleware } from "redux";
import  thunk  from 'redux-thunk';

const store = createStore(pokemon, composeWithDevTools(
    applyMiddleware(thunk)
));

export default store;