import { IProduct, IProductData } from '../types/index';
import { IEvents } from './base/events';
import { Model } from "./base/Model";

export class ProductData implements IProductData{
  _products: IProduct[];
  _preview: IProduct|null;
  events: IEvents;

  constructor(events: IEvents){
    this.events = events;
  }

  get products(): IProduct[] {
    return this._products;
  }

	setProducts(products: IProduct[]) {
		this._products = products;
		this.events.emit('product:change');
	}

  getProduct(productId:string){
    return this._products.find((iteam)=> iteam._id ===productId) || null;

  }

  setPreview(products: IProduct) {
    this._preview = products;
    this.events.emit('preview:changed', products);
}

  get preview(): IProduct | null {
		return this._preview;
	}
}
