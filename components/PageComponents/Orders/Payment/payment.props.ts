import { IOrder } from 'store/orders/order.interface';

export default interface PaymentProps {
	amount: number;

	orders: IOrder[];
	removeProductFromBasket: (productId: string, productSize: string) => void;
	setPopupProductAddedTitle: (titleValue: string) => void;
};