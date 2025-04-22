import { gql, useMutation, useQuery } from '@apollo/client';

import type { Product, ProductInput } from './types';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      stock
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

export function useProducts() {
  const { data, loading, error, refetch } = useQuery<{ products: Product[] }>(GET_PRODUCTS);

  return {
    products: data?.products || [],
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
