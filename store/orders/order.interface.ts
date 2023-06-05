export interface IOrder {
	_id: string;
	title: string;
	imgSrc: string;
	size: string;
	volume: number;
	price: number;
	quantity: number;
};

export interface IOrders {
	orders: IOrder[];
};