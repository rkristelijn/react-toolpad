import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { Order, Product, CreateOrderInput, UpdateOrderInput } from './types';

const API_URL = 'http://localhost:3001';

export const resolvers = {
  Query: {
    orders: async (): Promise<Order[]> => {
      const response = await axios.get(`${API_URL}/api/orders`);
      return response.data;
    },
    order: async (_: unknown, { id }: { id: string }): Promise<Order> => {
      const response = await axios.get(`${API_URL}/api/orders/${id}`);
      return response.data;
    },
    products: async (): Promise<Product[]> => {
      const response = await axios.get(`${API_URL}/api/products`);
      return response.data;
    },
    product: async (_: unknown, { id }: { id: string }): Promise<Product> => {
      const response = await axios.get(`${API_URL}/api/products/${id}`);
      return response.data;
    },
  },
  Mutation: {
    createOrder: async (_: unknown, { input }: { input: CreateOrderInput }): Promise<Order> => {
      const order = {
        id: uuidv4(),
        customerName: input.customerName,
        orderDate: new Date().toISOString(),
        status: 'pending',
        total: 0,
        items: input.items.map(item => ({
          id: uuidv4(),
          productId: item.productId,
          quantity: item.quantity,
          price: 0, // Will be updated when we fetch the product
        })),
      };
      const response = await axios.post(`${API_URL}/api/orders`, order);
      return response.data;
    },
    updateOrder: async (_: unknown, { id, input }: { id: string; input: UpdateOrderInput }): Promise<Order> => {
      const response = await axios.patch(`${API_URL}/api/orders/${id}`, input);
      return response.data;
    },
    deleteOrder: async (_: unknown, { id }: { id: string }): Promise<boolean> => {
      await axios.delete(`${API_URL}/api/orders/${id}`);
      return true;
    },
  },
  Order: {
    items: async (order: Order) => {
      return Promise.all(
        order.items.map(async item => {
          const product = await axios.get(`${API_URL}/api/products/${item.productId}`);
          return {
            id: item.id || uuidv4(), // Ensure ID exists
            productId: item.productId,
            quantity: item.quantity,
            price: item.price || product.data.price,
            product: product.data,
          };
        })
      );
    },
  },
};
