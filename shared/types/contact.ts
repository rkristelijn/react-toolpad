import type { Account } from './account';
import type { Address, AddressInput } from './address';

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
