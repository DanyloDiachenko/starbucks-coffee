import { AnyAction } from "redux";
import openPopupProductAddedInitStore from './initStore';

const popupProductAddedReducer = (state = openPopupProductAddedInitStore, action: AnyAction) => {
	switch (action.type) {
		case "SET_PRODUCT_POPUP_ADDED_TITLE":
			return {
				...state,
				title: action.titleValue
			};
		default:
			return state;
	}
};

export default popupProductAddedReducer;