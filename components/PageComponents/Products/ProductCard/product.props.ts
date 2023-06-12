import { IOrder } from 'store/orders/order.interface';

interface IDetail {
	_id: string;
	size: "short" | "tall" | "grande" | "venti";
	price: number;
	volume: number;
	calories: number;
	sugar: number;
}

export default interface ProductProps {
	_id: string;
	imgSrc: string;
	title: string;
	description: string;
	rating: number;
	saturatedFat3g: number;
	totalFat19g: number;
	transFat05g: number;
	details: IDetail[];
	createdAt: Date;

	addProductToBasket: (productToOrder: IOrder) => void;
	setPopupProductAddedTitle: (titleValue: string) => void;
};