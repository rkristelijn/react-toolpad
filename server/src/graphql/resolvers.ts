import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import {
  Order,
  Product,
  CreateOrderInput,
  UpdateOrderInput,
  Account,
  Contact,
  CreateAccountInput,
  UpdateAccountInput,
  CreateContactInput,
  UpdateContactInput,
} from '../../../shared/types';

const API_URL = 'http://localhost:3001';

interface AccountsArgs {
  sortField?: string;
  sortDirection?: string;
  page?: number;
  pageSize?: number;
}

export const resolvers = {
  Query: {
    // Account queries
    accounts: async (_: unknown, { sortField = 'name', sortDirection = 'asc', page = 1, pageSize = 10 }: AccountsArgs) => {
      const response = await axios.get(`${API_URL}/api/accounts`);
      const accounts = response.data as Account[];

      // Apply sorting
      if (sortField) {
        const direction = sortDirection === 'desc' ? -1 : 1;
        accounts.sort((a: Account, b: Account) => {
          const aValue = a[sortField as keyof Account];
          const bValue = b[sortField as keyof Account];
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return direction * aValue.localeCompare(bValue);
          }
          return 0;
        });
      }

      // Apply pagination
      const skip = (page - 1) * pageSize;
      const items = accounts.slice(skip, skip + pageSize);

      return {
        items,
        total: accounts.length,
      };
    },
    account: async (_: unknown, { id }: { id: string }) => {
      const response = await axios.get(`${API_URL}/api/accounts/${id}`);
      return response.data;
    },
    accountsByType: async (_: unknown, { type }: { type: string }) => {
      const response = await axios.get(`${API_URL}/api/accounts`);
      const accounts = response.data as Account[];
      return accounts.filter(account => account.type === type);
    },
    accountsByIndustry: async (_: unknown, { industry }: { industry: string }) => {
      const response = await axios.get(`${API_URL}/api/accounts`);
      const accounts = response.data as Account[];
      return accounts.filter(account => account.industry === industry);
    },

    // Contact queries
    contacts: async (
      _: unknown,
      {
        sortField,
        sortDirection,
        page = 1,
        pageSize = 10,
      }: { sortField?: string; sortDirection?: string; page?: number; pageSize?: number }
    ) => {
      const response = await axios.get(`${API_URL}/api/contacts`);
      let contacts = response.data as Contact[];

      if (sortField) {
        const direction = sortDirection === 'desc' ? -1 : 1;
        contacts.sort((a: Contact, b: Contact) => {
          const aValue = a[sortField as keyof Contact];
          const bValue = b[sortField as keyof Contact];
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return direction * aValue.localeCompare(bValue);
          }
          return 0;
        });
      }

      const total = contacts.length;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      contacts = contacts.slice(start, end);

      return {
        items: contacts,
        total,
      };
    },
    contact: async (_: unknown, { id }: { id: string }) => {
      const response = await axios.get(`${API_URL}/api/contacts/${id}`);
      return response.data;
    },
    contactsByAccount: async (_: unknown, { accountId }: { accountId: string }) => {
      const response = await axios.get(`${API_URL}/api/contacts`);
      const contacts = response.data as Contact[];
      return contacts.filter(contact => contact.accountId === accountId);
    },
    contactsByTitle: async (_: unknown, { title }: { title: string }) => {
      const response = await axios.get(`${API_URL}/api/contacts`);
      const contacts = response.data as Contact[];
      return contacts.filter(contact => contact.title === title);
    },

    orders: async (_: unknown, { sortField, sortDirection, page = 0 }: { sortField?: string; sortDirection?: string; page?: number }) => {
      const pageSize = 5; // Fixed page size
      const response = await axios.get(`${API_URL}/api/orders`);
      let orders = response.data as Order[];

      // Apply sorting if parameters are provided
      if (sortField) {
        const direction = sortDirection === 'desc' ? -1 : 1;

        // Handle nested field sorting (e.g., 'account.name')
        orders.sort((a: Order, b: Order) => {
          const fields = sortField.split('.');
          let aValue: any = a;
          let bValue: any = b;

          // Navigate through nested fields
          for (const field of fields) {
            aValue = aValue?.[field];
            bValue = bValue?.[field];
          }

          if (aValue === null || aValue === undefined || bValue === null || bValue === undefined) {
            return 0;
          }

          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return direction * aValue.localeCompare(bValue);
          }

          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return direction * (aValue - bValue);
          }

          return 0;
        });
      }

      // Apply pagination (using 0-based page number)
      const skip = page * pageSize;
      const items = orders.slice(skip, skip + pageSize);

      return {
        items,
        total: orders.length,
      };
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
      const products = response.data as Product[];

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
    // Account mutations
    createAccount: async (_: unknown, { input }: { input: CreateAccountInput }): Promise<Account> => {
      const account = {
        id: uuidv4(),
        ...input,
      };
      const response = await axios.post(`${API_URL}/api/accounts`, account);
      return response.data;
    },
    updateAccount: async (_: unknown, { id, input }: { id: string; input: UpdateAccountInput }): Promise<Account> => {
      const response = await axios.patch(`${API_URL}/api/accounts/${id}`, input);
      return response.data;
    },
    deleteAccount: async (_: unknown, { id }: { id: string }): Promise<boolean> => {
      await axios.delete(`${API_URL}/api/accounts/${id}`);
      return true;
    },

    // Contact mutations
    createContact: async (_: unknown, { input }: { input: CreateContactInput }): Promise<Contact> => {
      const contact = {
        id: uuidv4(),
        ...input,
      };
      const response = await axios.post(`${API_URL}/api/contacts`, contact);
      return response.data;
    },
    updateContact: async (_: unknown, { id, input }: { id: string; input: UpdateContactInput }): Promise<Contact> => {
      const response = await axios.patch(`${API_URL}/api/contacts/${id}`, input);
      return response.data;
    },
    deleteContact: async (_: unknown, { id }: { id: string }): Promise<boolean> => {
      await axios.delete(`${API_URL}/api/contacts/${id}`);
      return true;
    },

    createOrder: async (_: unknown, { input }: { input: CreateOrderInput }): Promise<Order> => {
      const orderItems = await Promise.all(
        input.items.map(async item => {
          const productResponse = await axios.get(`${API_URL}/api/products/${item.productId}`);
          const product = productResponse.data;
          return {
            id: uuidv4(),
            productId: item.productId,
            quantity: item.quantity,
            price: product.price,
            product,
          };
        })
      );

      const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const order: Order = {
        id: uuidv4(),
        accountId: input.accountId,
        orderDate: new Date().toISOString(),
        status: 'pending',
        total,
        items: orderItems,
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
    account: async (parent: Order) => {
      const response = await axios.get(`${API_URL}/api/accounts/${parent.accountId}`);
      return response.data;
    },
  },
  Account: {
    primaryContact: async (account: Account) => {
      if (!account.primaryContactId) return null;
      const response = await axios.get(`${API_URL}/api/contacts/${account.primaryContactId}`);
      return response.data;
    },
    contacts: async (account: Account) => {
      const response = await axios.get(`${API_URL}/api/contacts`);
      const contacts = response.data as Contact[];
      return contacts.filter(contact => contact.accountId === account.id);
    },
  },
  Contact: {
    account: async (contact: Contact) => {
      try {
        const response = await axios.get(`${API_URL}/api/accounts/${contact.accountId}`);
        return response.data;
      } catch (error) {
        console.error(`Failed to fetch account for contact ${contact.id}:`, error);
        // Return a minimal account object to prevent GraphQL errors
        return {
          id: contact.accountId,
          name: 'Unknown Account',
          type: 'Unknown',
          industry: 'Unknown',
          website: '',
          primaryContactId: null,
          contacts: [],
          billingAddress: null,
        };
      }
    },
  },
};
