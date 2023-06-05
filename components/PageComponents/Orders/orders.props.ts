import { IOrder } from 'store/orders/order.interface';

export default interface OrderProps {
	isOrdersOpen: boolean;
	closeOrders: () => void;
	orders: IOrder[];
	removeProductFromBasket: (productId: string, productSize: string) => void;
	incrementProductQuantity: (productId: string, productSize: string) => void;
	decrementProductQuantity: (productId: string, productSize: string) => void;
};