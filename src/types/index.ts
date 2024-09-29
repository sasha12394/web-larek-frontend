export interface IProduct{
  _id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number|null;
}
export interface IOrder{
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface IProductData{
  products: IProduct[];
  preview: string|null;
  getProduct(cardId:string): IProduct;
}

export interface IBasket{
  total: number|null;
}

export interface IOrderData{
setOrder(orderData: IOrder): void;
checkOrderStartValidation (data: (Record<keyof TOrderStart, string>)):boolean;
checkOrderEndValidation (data: (Record<keyof TOrderEnd, string>)):boolean;
}

export type TProductModal = Pick<IProduct, 'description'|'image'|'title'|'category'|'price'>
export type TBasket = Pick<IOrder, 'total'|'items'>
export type TOrderStart = Pick<IOrder, 'payment'|'address'>
export type TOrderEnd = Pick<IOrder, 'phone'|'email'>

export type FormErrors = Partial<Record<keyof IOrder, string>>;