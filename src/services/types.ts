export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product?: {
    name: string;
    price: number;
  };
}

export interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  status: string;
  total: number;
  items: OrderItem[];
}
