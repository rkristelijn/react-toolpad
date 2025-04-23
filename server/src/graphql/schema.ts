import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type OrderItem {
    id: ID!
    productId: ID!
    quantity: Int!
    price: Float!
    product: Product
  }

  type Order {
    id: ID!
    customerName: String!
    orderDate: String!
    status: String!
    total: Float!
    items: [OrderItem!]!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
    stock: Int
  }

  type ProductsResponse {
    items: [Product!]!
    total: Int!
  }

  type Query {
    orders(sortField: String, sortDirection: String): [Order!]!
    order(id: ID!): Order
    products(sortField: String, sortDirection: String, page: Int, pageSize: Int): ProductsResponse!
    product(id: ID!): Product
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order!
    updateOrder(id: ID!, input: UpdateOrderInput!): Order!
    deleteOrder(id: ID!): Boolean!
  }

  input CreateOrderInput {
    customerName: String!
    items: [OrderItemInput!]!
  }

  input UpdateOrderInput {
    customerName: String
    status: String
    items: [OrderItemInput!]
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
  }
`;
