import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { Order, Product, CreateOrderInput, UpdateOrderInput } from '../../../shared/types';

const API_URL = 'http://localhost:3001';

export const resolvers = {
  Query: {
    orders: async (_: unknown, { sortField, sortDirection }: { sortField?: string; sortDirection?: string }) => {
      const response = await axios.get(`${API_URL}/api/orders`);
      const orders = response.data as Order[];

      // Apply sorting if parameters are provided
      if (sortField) {
        const direction = sortDirection === 'desc' ? -1 : 1;

        orders.sort((a: Order, b: Order) => {
          const aValue = a[sortField as keyof Order];
          const bValue = b[sortField as keyof Order];

          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return direction * aValue.localeCompare(bValue);
          }

          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return direction * (aValue - bValue);
          }

          return 0;
        });
      }

      return orders;
    },
    order: async (_: unknown, { id }: { id: string }) => {
      const response = await axios.get(`${API_URL}/api/orders/${id}`);
      return response.data;
    },
    products: async (
      _: unknown,
      { sortField, sortDirection, page = 0, pageSize = 5 }: { sortField?: string; sortDirection?: string; page?: number; pageSize?: number }
    ) => {
      const response = await axios.get(`${API_URL}/api/products`);
      let products = response.data as Product[];

      // Apply sorting if parameters are provided
      if (sortField) {
        const direction = sortDirection === 'desc' ? -1 : 1;

        products.sort((a: Product, b: Product) => {
          const aValue = a[sortField as keyof Product];
          const bValue = b[sortField as keyof Product];

          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return direction * aValue.localeCompare(bValue);
          }

          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return direction * (aValue - bValue);
          }

          return 0;
        });
      }

      // Apply pagination
      const start = page * pageSize;
      const paginatedProducts = products.slice(start, start + pageSize);

      return {
        items: paginatedProducts,
        total: products.length,
      };
    },
    product: async (_: unknown, { id }: { id: string }) => {
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
