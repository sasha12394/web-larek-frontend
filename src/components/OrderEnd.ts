import { IEvents } from './base/events';
import { TOrderEnd } from '../types';
import { Form } from './common/Form';

export class OrderEnd extends Form<TOrderEnd> {
	protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}
}
