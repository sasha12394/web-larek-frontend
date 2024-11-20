import { Api, ApiListResponse } from './base/api';
import { IOrder, IProduct } from '../types';

export interface ILarekAPI {
	getProductList: () => Promise<IProduct[]>;
	getProductItem: (id: string) => Promise<IProduct>;
	orderProduct: (order: IOrder) => Promise<IOrder>;
}

export class LarekAPI extends Api {
	cdn: string;
	private _baseApi: Api;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductItem(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`).then((item: IProduct) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	getProductList(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}
	orderProducts(order: IOrder): Promise<IOrder> {
		return this.post('/order', order).then((data: IOrder) => data);
	}
}
