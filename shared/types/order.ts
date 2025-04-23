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
  customerName: string;
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
  customerName: string;
  items: OrderItemInput[];
}

export interface UpdateOrderInput {
  customerName?: string;
  status?: string;
  items?: OrderItemInput[];
}
