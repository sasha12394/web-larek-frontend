import { IEvents } from './base/events';
import { IBasket, IProduct, TProductBasket } from '../types/index';

export class BasketData implements IBasket {
	orderBasket: TProductBasket[] = [];
	total: 0;
	constructor(protected events: IEvents) {
		this.events = events;
	}
	get basket(): TProductBasket[] {
		return this.orderBasket;
	}

	addToBasket(product: TProductBasket) {
		this.orderBasket.push(product);
		this.events.emit('basket:changed');
	}

	removeFromBasket(product: TProductBasket) {
		this.orderBasket = this.orderBasket.filter(
			(orderBasket) => orderBasket !== product
		);
		this.events.emit('basket:changed');
	}

	getTotal() {
		return this.orderBasket
			.filter((item) => item.price !== null) // Отфильтровываем элементы с null ценой
			.reduce((sum, next) => sum + next.price, 0);
	}
	clearBasket() {
		this.orderBasket = [];
		this.events.emit('basket:changed');
	}
	getBasketLength() {
		return this.orderBasket.length;
	}
	isInBasket(product: IProduct) {
		return this.orderBasket.some((card) => card.id === product.id);
	}

	getOrderId() {
		return this.orderBasket
			.filter((card) => card.price !== null) // Фильтруем продукты с ценой не null
			.map((card) => card.id); // Получаем id отфильтрованных продуктов
	}
}
