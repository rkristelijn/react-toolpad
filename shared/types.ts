export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface AddressInput {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface CreateAccountInput {
  name: string;
  type: string;
  industry: string;
  website: string;
  primaryContactId?: string;
  billingAddress: AddressInput;
}

export interface UpdateAccountInput {
  name?: string;
  type?: string;
  industry?: string;
  website?: string;
  primaryContactId?: string;
  billingAddress?: AddressInput;
}

export interface CreateContactInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  accountId: string;
  address: AddressInput;
}

export interface UpdateContactInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  title?: string;
  accountId?: string;
  address?: AddressInput;
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

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  stock?: number;
}

export interface ProductInput {
  name: string;
  price: number;
  description?: string;
  stock?: number;
}

export interface Account {
  id: string;
  name: string;
  type: string;
  industry: string;
  website: string;
  primaryContactId: string;
  primaryContact?: Contact;
  contacts: Contact[];
  billingAddress: Address;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  accountId: string;
  account: Account;
  address: Address;
}
