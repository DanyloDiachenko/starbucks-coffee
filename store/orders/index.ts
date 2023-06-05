import { AnyAction } from "redux";
import ordersInitStore from './initStore';

const ordersReducer = (state = ordersInitStore, action: AnyAction) => {
	switch (action.type) {
		case "ADD_PRODUCT_TO_BASKET":
			/* Проверка наличия элемента с таким же _id и size в корзине */
			const existingOrder = state.orders.find(
				order => order._id === action.product._id && order.size === action.product.size
			);

			if (existingOrder) {
				/* Если элемент уже существует, обновляем его quantity */
				return {
					...state,
					orders: state.orders.map(order => {
						/* увелечивае quantity продукта, поскольку в корзине уже может лежать 
						такой продукт, а не добавляем такой-же */
						if (order._id === action.product._id && order.size === action.product.size) {
							return {
								...order,
								quantity: order.quantity + action.product.quantity,
							};
						}
						return order;
					}),
				};
			} else {
				/* Если элемента нет в корзине, добавляем его */
				return {
					...state,
					orders: state.orders.concat(action.product),
				};
			}
		case "REMOVE_PRODUCT_FROM_BASKET":
			/* Убираем продукт из orders. Проверяем _id и price продукта, поскольку может быть такое,
			что в корзине есть несколько продуктов с одинаковыми _id, но разных размеров(size),
			по этому проверяем еще по size и _id */
			return {
				...state,
				orders: state.orders.filter(
					order => !(order._id === action._id && order.size === action.size)
				),
			};
		case "INCREASE_PRODUCT_QUANTITY":
			/* Увеличиваем количество продукта в orders. Проверяем _id и price продукта, поскольку может быть такое,
			что в корзине есть несколько продуктов с одинаковыми _id, но разных размеров(size),
			по этому проверяем еще по size и _id */
			return {
				...state,
				orders: state.orders.map(order => {
					if (order._id === action._id && order.size === action.size) {
						return {
							...order,
							quantity: order.quantity + 1,
						};
					}
					return order;
				}),
			};
		case "DEACREASE_PRODUCT_QUANTITY":
			/* Уменьшаем количество продукта в orders. Проверяем _id и price продукта, поскольку может быть такое,
			что в корзине есть несколько продуктов с одинаковыми _id, но разных размеров(size),
			по этому проверяем еще по size и _id */
			return {
				...state,
				orders: state.orders.map(order => {
					if (order._id === action._id && order.size === action.size) {
						return {
							...order,
							quantity: order.quantity - 1,
						};
					}
					return order;
				}),
			};
		default:
			return state;
	}
};

export default ordersReducer;