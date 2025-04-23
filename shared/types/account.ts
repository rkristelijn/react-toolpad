export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Account {
  id: string;
  name: string;
  type: string;
  industry: string;
  website?: string;
  phone?: string;
  address?: Address;
  primaryContactId?: string;
  createdAt: string;
  updatedAt: string;
}
