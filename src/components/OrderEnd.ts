import {EventEmitter, IEvents} from "./base/events";
import {ensureElement} from "../utils/utils";
import { TOrderEnd } from "../types";
import { Form } from "./common/Form";

export class OrderEnd extends Form<TOrderEnd> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }
}