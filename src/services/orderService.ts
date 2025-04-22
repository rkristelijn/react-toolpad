import { gql, useQuery, useMutation } from '@apollo/client';

// GraphQL Queries and Mutations
export const ORDERS_QUERY = gql`
  query GetOrders {
    orders {
      id
      customerName
      orderDate
      status
      total
      items {
        id
        quantity
        price
        product {
          name
          price
        }
      }
    }
  }
`;

export const ORDER_QUERY = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
      id
      customerName
      orderDate
      status
      total
      items {
        id
        quantity
        price
        product {
          name
          price
        }
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      customerName
      status
      total
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: ID!, $input: UpdateOrderInput!) {
    updateOrder(id: $id, input: $input) {
      id
      status
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;

// Custom hooks for orders
export function useOrders() {
  const { data, loading, error, refetch } = useQuery(ORDERS_QUERY);
  return {
    orders: data?.orders || [],
    loading,
    error,
    refetch,
  };
}

export function useOrder(id: string) {
  const { data, loading, error } = useQuery(ORDER_QUERY, {
    variables: { id },
  });
  return {
    order: data?.order,
    loading,
    error,
  };
}

export function useCreateOrder() {
  const [createOrder, { loading }] = useMutation(CREATE_ORDER, {
    refetchQueries: [{ query: ORDERS_QUERY }],
  });

  return {
    createOrder: (input: { customerName: string; items: Array<{ productId: string; quantity: number }> }) =>
      createOrder({ variables: { input } }),
    loading,
  };
}

export function useUpdateOrder() {
  const [updateOrder, { loading }] = useMutation(UPDATE_ORDER, {
    refetchQueries: [{ query: ORDERS_QUERY }],
  });

  return {
    updateOrder: (id: string, input: { status?: string; customerName?: string }) => updateOrder({ variables: { id, input } }),
    loading,
  };
}

export function useDeleteOrder() {
  const [deleteOrder, { loading }] = useMutation(DELETE_ORDER, {
    refetchQueries: [{ query: ORDERS_QUERY }],
  });

  return {
    deleteOrder: (id: string) => deleteOrder({ variables: { id } }),
    loading,
  };
}
