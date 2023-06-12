import { createStore, combineReducers } from "redux";

import ordersReducer from './orders';
import popupProductAddedReducer from './popupProductAdded';

export const store = createStore(
	combineReducers({
		orders: ordersReducer,
		popupProductAddedTitle: popupProductAddedReducer
	})
);

export default store;