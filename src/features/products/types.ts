export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
}
