import IProduct from '../Products/product.interface';
import { IOrder } from 'store/orders/order.interface';

export default interface ProductDetailsProps {
	product: IProduct;
	addProductToBasket: (productToOrder: IOrder) => void;
	setPopupProductAddedTitle: (titleValue: string) => void;
};