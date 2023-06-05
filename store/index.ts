import { createStore, combineReducers } from "redux";

import ordersReducer from './orders';

export const store = createStore(
	combineReducers({
		orders: ordersReducer,
	})
);

export default store;