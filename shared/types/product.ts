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
