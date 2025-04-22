export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

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
  items?: OrderItem[];
}

export interface CreateOrderInput {
  customerName: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

export interface UpdateOrderInput {
  customerName?: string;
  status?: string;
  items?: {
    productId: string;
    quantity: number;
  }[];
}
