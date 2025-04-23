import { gql, useMutation, useQuery } from '@apollo/client';

import type { SortField, SortDirection } from './ProductListViewController';
import type { Product, ProductInput } from '../../../shared/types';

export const GET_PRODUCTS = gql`
  query GetProducts($sortField: String, $sortDirection: String, $page: Int, $pageSize: Int) {
    products(sortField: $sortField, sortDirection: $sortDirection, page: $page, pageSize: $pageSize) {
      items {
        id
        name
        price
        stock
      }
      total
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      stock
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      price
      stock
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      description
      price
      stock
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export interface ProductsResponse {
  items: Product[];
  total: number;
}

interface ProductsQueryResult {
  products: {
    items: Product[];
    total: number;
  };
}

interface ProductsQueryVariables {
  sortField?: SortField;
  sortDirection?: SortDirection;
  page?: number;
  pageSize?: number;
}

export function useProducts(variables: ProductsQueryVariables) {
  const { data, loading, error, refetch } = useQuery<ProductsQueryResult, ProductsQueryVariables>(GET_PRODUCTS, {
    variables,
  });

  return {
    data: data?.products,
    loading,
    error,
    refetch,
  };
}

export function useProduct(id: string) {
  const { data, loading, error } = useQuery<{ product: Product }>(GET_PRODUCT, {
    variables: { id },
    skip: !id,
  });

  return {
    product: data?.product,
    loading,
    error,
  };
}

export function useCreateProduct() {
  const [createProduct, { loading, error }] = useMutation<{ createProduct: Product }, { input: ProductInput }>(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  return {
    createProduct: (input: ProductInput) => createProduct({ variables: { input } }),
    loading,
    error,
  };
}

export function useUpdateProduct() {
  const [updateProduct, { loading, error }] = useMutation<{ updateProduct: Product }, { id: string; input: ProductInput }>(UPDATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  return {
    updateProduct: (id: string, input: ProductInput) => updateProduct({ variables: { id, input } }),
    loading,
    error,
  };
}

export function useDeleteProduct() {
  const [deleteProduct, { loading, error }] = useMutation<{ deleteProduct: boolean }, { id: string }>(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  return {
    deleteProduct: (id: string) => deleteProduct({ variables: { id } }),
    loading,
    error,
  };
}
