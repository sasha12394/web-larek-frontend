import {
	IOrder,
	IOrderData,
	PaymentType,
	TFormErrors,
	TOrderInput,
} from '../types';
import { IEvents } from './base/events';

export class OrderData implements IOrderData {
	protected _formErrors: TFormErrors;
	protected _order: IOrder = {
		email: '',
		phone: '',
		address: '',
		payment: '',
	};

	constructor(protected events: IEvents) {
		this.events = events;
	}

	get formErrors(): TFormErrors {
		return this.formErrors;
	}

	get order(): IOrder {
		return this._order;
	}

	setOrderPayment(value: PaymentType) {
		this._order.payment = value;
	}

	setOrderEmail(value: string) {
		this._order.email = value;
	}

	setOrderAddress(value: string) {
		this._order.address = value;
	}
	setOrderPhone(value: string) {
		this._order.phone = value;
	}
	setOrderField(field: keyof TOrderInput, value: string) {
		this._order[field] = value;
		this.validateOrder();
	}

	validateOrder() {
		const errors: typeof this._formErrors = {};
		if (!this._order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this._order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		if (!this._order.address) {
			errors.address = 'Необходимо указать адресс';
		}
		if (!this._order.payment) {
			errors.payment = 'Необходимо указать способ оплаты';
		}
		this._formErrors = errors;
		this.events.emit('errors:change', this._formErrors);
		return Object.keys(errors).length === 0;
	}
	clearOrder() {
		this._order = {
			email: '',
			phone: '',
			address: '',
			payment: '',
		};
	}
}
