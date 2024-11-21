import { LarekAPI } from './components/LarekAPI';
import { Page } from './components/Page';
import { Card, CardBasket, CardPreview} from './components/Product';
import { ProductData, } from './components/ProductData';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { IProduct } from './types';
import { CDN_URL, API_URL } from './utils/constants'
import { ensureElement, cloneTemplate } from './utils/utils';
import { BasketData } from './components/BasketData'
import { OrderData } from './components/OrderData'
import { Modal } from './components/common/Modal';
import { Basket } from './components/Basket'
import{  IOrder, PaymentType} from './types'
import { OrderEnd } from './components/OrderEnd';
import { OrderStart } from './components/OrderStart'
import { Success } from './components/common/Success';
const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);


const productData = new ProductData(events);
const basketData = new BasketData(events);
const orderData = new OrderData(events);

const page = new Page(document.body, events);
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderSuccessTemplate = ensureElement<HTMLTemplateElement>('#success');
const orderStartTemplate = ensureElement<HTMLTemplateElement>('#order');
const orderEndTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const basket = new Basket(cloneTemplate(basketTemplate), events);
const contactsForm = new OrderEnd(cloneTemplate(orderEndTemplate), events);
const orderStartForm = new OrderStart(cloneTemplate(orderStartTemplate), events);


	api.getProductList()
    .then((products) => {
			productData.setProducts(products);
		})
    .catch(err => {
        console.error(err);
    });
	
		events.on('product:change', () => 
		{
						page.catalog = productData._products.map((product) => {
				const card = new Card(cloneTemplate(cardCatalogTemplate), {
					onClick: () => {
						events.emit('preview:changed', product);
					},
				});
				return card.render({
					id: product.id,
					image: product.image,
					title: product.title,
					category: product.category,
					price: product.price
				});
			});
		})
		events.on('product:selected', (product: IProduct) => {
			productData.setPreview(product);
	});

	events.on('preview:changed', (product: IProduct) => {
		const isInBasket = basketData.isInBasket(product);
		const card = new CardPreview(cloneTemplate(cardPreviewTemplate), {
			
					onClick:() => {
						events.emit('product-in-basket:select', product);
            }
        });
        modal.render({
            content: card.render({
							id: product.id,
							description: product.description,
							image: product.image,
							title: product.title,
							category: product.category,
							price: product.price,
						disabled: isInBasket
						})
            })
        });


// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
	
});


events.on('product-in-basket:select', (product: IProduct) => {
	product.disabled=true;
  basketData.addToBasket(product);
  modal.close();
})
events.on('basket:open', () => {	modal.render({
	content: basket.render(),
});
})
events.on('basket:changed', () => {
	page.counter = basketData.getBasketLength();
	basket.total = basketData.getTotal();
	basket.items = basketData.basket.map((basketCard, index) => {
		const newBasketCard = new CardBasket(cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				basketData.removeFromBasket(basketCard);
			},
		});
		return newBasketCard.render({
			title: basketCard.title,
			price: basketCard.price,
					index: index + 1,

		});

	});
})



events.on('order-start:open', () => {
	modal.render({
		content: orderStartForm.render({
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on(
	/^order\..*:change/,
	(data: {
		field: keyof Pick<IOrder, 'address' | 'phone' | 'email'>;
		value: string;
	}) => {
		orderData.setOrderField(data.field, data.value);
	}
);


events.on(
	'order-start:change',
	(data: { payment: PaymentType; button: HTMLElement }) => {
		orderStartForm.togglePayment(data.button);
		orderData.setOrderPayment(data.payment);
		orderData.validateOrder();
	}
);

events.on('errors:change', (errors: Partial<IOrder>) => {
	const { email, phone, address, payment } = errors;

	orderStartForm.valid = !(payment || address);
	orderStartForm.errors = [payment, address].filter(Boolean).join('; ');

	contactsForm.valid = !(email || phone);
	contactsForm.errors = [email, phone].filter(Boolean).join('; ');
});

events.on('order:submit', () => {
	modal.render({
		content: contactsForm.render({
			phone: '',
			email: '',
			valid: false,
			errors: [],
		}),
	});
});
events.on('contacts:submit', () => {
	const orderForServer = {...orderData.order,
		items: basketData.getOrderId(),
		total: basketData.getTotal()}
  api.orderProducts(orderForServer)
    .then((result) => {
      const success = new Success(cloneTemplate(orderSuccessTemplate), {
        onClick: () => {
          modal.close();
          page.counter = basketData.orderBasket.length;
        }
      });
    
      modal.render({
        content: success.render({
					total: basketData.getTotal()
        })
      })
			basketData.clearBasket();
    })
    .catch(err => {
      console.error(err);
    })
});


