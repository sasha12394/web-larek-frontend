import { TOrderStart } from '../types';
import { IEvents } from './base/events';
import { Form } from './common/Form';

export class OrderStart extends Form<TOrderStart> {
	protected _buttonCard: HTMLButtonElement;
	protected _buttonCash: HTMLButtonElement;
	protected _address: HTMLInputElement;

	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);

		this._buttonCard = container.elements.namedItem(
			'card'
		) as HTMLButtonElement;
		this._buttonCash = container.elements.namedItem(
			'cash'
		) as HTMLButtonElement;

		if (this._buttonCard) {
			this._buttonCard.addEventListener('click', () => {
				events.emit('order-start:change', {
					payment: this._buttonCard.name,
					button: this._buttonCard,
				});
			});
		}

		if (this._buttonCash) {
			this._buttonCash.addEventListener('click', () => {
				events.emit('order-start:change', {
					payment: this._buttonCash.name,
					button: this._buttonCash,
				});
			});
		}
	}
	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	togglePayment(value: HTMLElement) {
		this.resetPayment();
		this.toggleClass(value, 'button_alt-active', true);
	}

	resetPayment() {
		this.toggleClass(this._buttonCash, 'button_alt-active', false);
		this.toggleClass(this._buttonCard, 'button_alt-active', false);
	}
}
