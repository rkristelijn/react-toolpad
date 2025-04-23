import type { Account } from './account';
import type { Product } from './product';

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Order {
  id: string;
  accountId: string;
  account?: Account;
  orderDate: string;
  status: string;
  total: number;
  items: OrderItem[];
}

export interface OrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderInput {
  accountId: string;
  items: OrderItemInput[];
}

export interface UpdateOrderInput {
  status?: string;
  items?: OrderItemInput[];
}
