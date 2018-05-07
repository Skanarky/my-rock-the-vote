import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import issueReducer from "./issues.js";
import commentReducer from "./comments.js";

const store = createStore(combineReducers({ issues: issueReducer, comments: commentReducer }), applyMiddleware(thunk));

export default store;