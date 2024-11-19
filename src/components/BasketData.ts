import { IEvents } from './base/events';
import { IOrderData, IBasket, TBasket, IOrder, IProduct, TProductBasket } from '../types/index';

export class BasketData implements IBasket {
  orderBasket :  TProductBasket[] = [];
  total: 0;
  constructor(protected events: IEvents) {
		this.events = events;
	}
  get basket(): TProductBasket[] {
    return this.orderBasket
  }

	addToBasket(product: TProductBasket) {
		this.orderBasket.push(product);
		this.events.emit('basket:open');
	}

	removeFromBasket(product: TProductBasket) {
    this.orderBasket = this.orderBasket.filter(orderBasket => orderBasket !== product);
		this.events.emit('basket:open');
	}

getTotal() {

return this.orderBasket.reduce((sum, next) => sum + next.price, 0);
}

clearBasket() {
  this.orderBasket = []
  this.events.emit('basket:open');
}
getBasketLength() {
  return this.orderBasket.length;
}
isInBasket(product: IProduct) {
  console.log(product)
  console.log(this.orderBasket)
	return this.orderBasket.some(card => card._id === product._id);
}

sendBasketToOrder(orderData: IOrderData) {
  const orderItems = this.orderBasket.map((product) => product._id);

  orderData.setOrderField('items', orderItems);
  orderData.setOrderField('total', this.getTotal());
}
}