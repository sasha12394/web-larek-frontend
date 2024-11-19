import { IOrder, IOrderData, PaymentType, TFormErrors, TOrderStart, TOrderEnd, TOrderInput } from '../types';
import { IEvents } from './base/events';


export class OrderData implements IOrderData {
	protected _formErrors: TFormErrors;
	protected _order: IOrder = {
		total: 0,
		items: [],
		email: '',
		phone: '',
		address: '',
		payment: '',
	};

	constructor(protected events: IEvents) {
		this.events = events;
	}

	get formErrors(): TFormErrors {
		return this._formErrors;
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
		this._order.phone = value;
	}
	setOrderField(field: keyof TOrderInput, value: string) {
		this._order[field] = value;
		this.validateOrder();
	}

	validateOrder() {
		const errors: typeof this._formErrors = {};

		if (!this._order.payment) {
			errors.payment = 'Укажите способ оплаты';
		}
		if (!this._order.email) {
			errors.email = 'Укажите ваш e-mail';
		}
		if (!this._order.address) {
			errors.address = 'Укажите адрес доставки';
		}
		if (!this._order.phone) {
			errors.phone = 'Укажите номер телефона';
		}

		this._formErrors = errors;
		this.events.emit('errors:change', this._formErrors);

		return Object.keys(errors).length === 0;
	}

	clearOrder() {
		this._order = {
			total: 0,
			items: [],
			email: '',
			phone: '',
			address: '',
			payment: '',
		};
	}
}

/*
export class OrderData implements IOrderData{
 _order: IOrder ={
  payment: '',
  email: '',
  phone: '',
  address: '',
  total: 0,
  items: []
}
_formErrors: TFormErrors;

constructor(protected events: IEvents) {
  this.events = events;
}

get formErrors(): TFormErrors {
  return this._formErrors;
}

get order(): IOrder {
  return this._order;
}

setOrderStart(orderData: TOrderStart, value?: string) {
  this._order.address = value;
}

setOrderEnd(orderData: TOrderEnd, value?: string) {
  this._order.phone = value;
  this._order.email = value;
}
/*
setOrderStartField(field: keyof TOrderStart, value: string) {
  this.order[field] = value;

  if (this.validateStart()) {
      this.events.emit('order:ready', this.order);
  } 
}

setOrderEndField(field: keyof TOrderEnd, value: string) {
  this.order[field] = value;

  if (this.validateEnd()) {
      this.events.emit('order:ready', this.order);
  } 
}
setOrderField(field: keyof IOrder, value: string) {
  this.order[field] = value;

  if (this.validateEnd()) {
    this.events.emit('contacts:ready', this.order)
  }
  if (this.validateStart()) {
    this.events.emit('order:ready', this.order);
  }
}
validateStart() {
    const errors: typeof this.formErrors = {};
    
    if (!this.order.address) {
      errors.address = 'Необходимо указать адресс';
    }
    this._formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
}

validateEnd() {
    const errors: typeof this.formErrors = {};
    if (!this.order.email) {
        errors.email = 'Необходимо указать email';
    }
    if (!this.order.phone) {
        errors.phone = 'Необходимо указать телефон';
    }
    
    this._formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
}
clearOrder(){
  this._order ={
    payment: '',
    email: '',
    phone: '',
    address: '',
    total: 0,
    items: []
  }
}
}*/