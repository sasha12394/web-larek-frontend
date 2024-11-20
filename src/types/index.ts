export type PaymentType = 'card' | 'cash';

export interface IProduct{
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number|null;
  disabled: boolean;

}
export interface IOrder{
  payment?: string;
  email?: string;
  phone?: string;
  address?: string;

}

export interface IProductData{
  products: IProduct[];
  preview: IProduct|null;
  getProduct(productId:string): IProduct;
  setProducts(products: IProduct[]): void;

}

export interface IBasket{
  orderBasket: TProductBasket[];
  total: number|null;
}

export type TFormErrors = Partial<Record<keyof IOrder, string>>;

export interface IOrderData {
	formErrors: TFormErrors;
	order: IOrder;
	setOrderPayment(value: string): void;
	setOrderEmail(value: string): void;
  setOrderField(field: keyof TOrderInput, value: string): void;
  setOrderField(field: keyof IOrder, value: IOrder[keyof IOrder]): void;
	validateOrder(): boolean;
	clearOrder(): void;
}
export type TOrderInput = Pick<
	IOrder,'payment' | 'address' | 'email' | 'phone'>;
export type TProductModal = Pick<IProduct, 'description'|'image'|'title'|'category'|'price'>
export type TProductBasket = Pick<IProduct, 'id'| 'title'|'price'>
export type TOrderStart = Pick<IOrder, 'payment'|'address'>
export type TOrderEnd = Pick<IOrder, 'email'|'phone'>

