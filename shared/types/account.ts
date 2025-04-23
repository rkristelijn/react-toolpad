import type { Address } from './address';
import type { Contact } from './contact';

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
