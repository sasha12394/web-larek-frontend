import { IProduct } from "../types";
import { cloneTemplate } from "../utils/utils";
import { IEvents } from "./base/events";
import {Component} from "./base/Component";
import {bem, createElement, ensureElement } from "../utils/utils";

export const categories = new Map([
	['софт-скил', 'card__category_soft'],
	['хард-скил', 'card__category_hard'],
	['другое', 'card__category_other'],
	['дополнительное', 'card__category_additional'],
	['кнопка', 'card__category_button'],
]);

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}


export class Card extends Component<IProduct> {
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _button: HTMLButtonElement;
  protected _category: HTMLElement;
  protected _price: HTMLElement;

  
  

  constructor( container: HTMLElement, actions?: ICardActions) {
      super(container);
      this._title = ensureElement<HTMLElement>(`.card__title`, container);
      this._image = ensureElement<HTMLImageElement>(`.card__image`, container);
      this._button = container.querySelector(`.card__button`);
      this._category = container.querySelector(`.card__category`);
      this._price = container.querySelector(`.card__price`);

      if (actions?.onClick) {
          if (this._button) {
              this._button.addEventListener('click', actions.onClick);
          } else {
              container.addEventListener('click', actions.onClick);
          }
      }
  }
  
  set _id(value: string) {
    this.container.dataset.id = value;
}

get _id(): string {
    return this.container.dataset.id || '';
}
set title(value: string) {
    this.setText(this._title, value);
}

get title(): string {
    return this._title.textContent || '';
}

set disabled (value: boolean) {
  if (value) {
    this.setText(this._button, `Уже в корзине`);
    this.setDisabled(this._button, true);

  } else {
    this.setText(this._button, `Купить`);
    this.setDisabled(this._button, false);
  }
}

set image(value: string) {
    this.setImage(this._image, value, this.title)
}


set category(value: string) {
	this.setText(this._category, value);
	this.toggleClass(this._category, categories.get(value), true);
}

get category(): string {
  return this._category.textContent || '';
}

set price(value: number | null) {
  if (value) {
    this.setText(this._price, `${value} синапсов`);
    if (this._button) {
      this._button.disabled = false; 
    }
  } else {
    this.setText(this._price, 'Бесценно');
    if (this._button) {
      this._button.disabled = true;
    }
  }
}
}
interface ICardBasket {
  title: string;
  price: number;
  index: number;
}

export class CardBasket extends Component<ICardBasket> {
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLElement;
  protected _index: HTMLElement;
  
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this._title = ensureElement<HTMLElement>(`.card__title`, container);
    this._price = ensureElement<HTMLElement>(`.card__price`, container);
    this._index = ensureElement<HTMLElement>(`.basket__item-index`, container);
    this._button = container.querySelector(`.card__button`);

    if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
  }

  set index(value: number) {
    this.setText(this._index, value);
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set price(value: string) {
    this.setText(this._price, `${value} синапсов`);
  }
}

