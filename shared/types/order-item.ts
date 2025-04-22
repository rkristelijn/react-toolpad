import type { Product } from './product';

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface OrderItemInput {
  productId: string;
  quantity: number;
}
