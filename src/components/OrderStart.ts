import { TOrderStart } from '../types';
import { IEvents } from './base/events';
import { Form } from './common/Form';

export class OrderStart extends Form<TOrderStart> {
	protected _buttonOnline: HTMLButtonElement;
	protected _buttonCash: HTMLButtonElement;
	protected _address: HTMLInputElement;

	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);

		this._buttonCash = container.querySelector(
			'button[name="cash"]'
		) as HTMLButtonElement;
		this._buttonOnline = container.querySelector(
			'button[name="card"]'
		) as HTMLButtonElement;

		if (this._buttonOnline) {
			this._buttonOnline.addEventListener('click', () => {
				events.emit('order:change', {
					payment: this._buttonOnline.name,
					button: this._buttonOnline,
				});
			});
		}

		if (this._buttonCash) {
			this._buttonCash.addEventListener('click', () => {
				events.emit('order:change', {
					payment: this._buttonCash.name,
					button: this._buttonCash,
				});
			});
		}
	}
  set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value = value;
}

	togglePayment(value: HTMLElement) {
		this.resetPayment();
		this.toggleClass(value, 'button_alt-active', true);
	}

	resetPayment() {
		this.toggleClass(this._buttonCash, 'button_alt-active', false);
		this.toggleClass(this._buttonOnline, 'button_alt-active', false);
	}
}
