import type { OrderItem, OrderItemInput } from './order-item';

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
  orderDate: string;
}

export interface CreateOrderInput {
  customerName: string;
  customerEmail: string;
  items: OrderItemInput[];
}

export interface UpdateOrderInput {
  customerName?: string;
  status?: OrderStatus;
  items?: OrderItemInput[];
}
