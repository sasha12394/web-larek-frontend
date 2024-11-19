import {Component} from "../base/Component";
import {ensureElement} from "../../utils/utils";

interface ISuccess {
    total: number;
}

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Component<ISuccess> {
   _close: HTMLElement;
   _description:HTMLElement;
    constructor(container: HTMLElement, actions: ISuccessActions) {
        super(container);

        this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
        this._description = container.querySelector(`.order-success__description`);
        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
    }
    set total(total: number) {
      this.setText(this._description, `Ваш заказ ${total} синапсов`);
    }
}