import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Address {
    street: String!
    city: String!
    state: String!
    zip: String!
    country: String!
  }

  type Account {
    id: ID!
    name: String!
    type: String!
    industry: String!
    website: String!
    primaryContactId: ID
    primaryContact: Contact
    contacts: [Contact!]!
    billingAddress: Address
  }

  type AccountsResponse {
    items: [Account!]!
    total: Int!
  }

  type Contact {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    title: String!
    accountId: ID!
    account: Account!
    address: Address!
  }

  type ContactsResponse {
    items: [Contact!]!
    total: Int!
  }

  type OrderItem {
    id: ID!
    productId: ID!
    quantity: Int!
    price: Float!
    product: Product
  }

  type Order {
    id: ID!
    accountId: ID!
    account: Account!
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
    # Account queries
    accounts(sortField: String, sortDirection: String, page: Int, pageSize: Int): AccountsResponse!
    account(id: ID!): Account
    accountsByType(type: String!): [Account!]!
    accountsByIndustry(industry: String!): [Account!]!

    # Contact queries
    contacts(sortField: String, sortDirection: String, page: Int, pageSize: Int): ContactsResponse!
    contact(id: ID!): Contact
    contactsByAccount(accountId: ID!): [Contact!]!
    contactsByTitle(title: String!): [Contact!]!

    # Existing queries
    orders(sortField: String, sortDirection: String): [Order!]!
    order(id: ID!): Order
    products(sortField: String, sortDirection: String, page: Int, pageSize: Int): ProductsResponse!
    product(id: ID!): Product
  }

  type Mutation {
    # Account mutations
    createAccount(input: CreateAccountInput!): Account!
    updateAccount(id: ID!, input: UpdateAccountInput!): Account!
    deleteAccount(id: ID!): Boolean!

    # Contact mutations
    createContact(input: CreateContactInput!): Contact!
    updateContact(id: ID!, input: UpdateContactInput!): Contact!
    deleteContact(id: ID!): Boolean!

    # Existing mutations
    createOrder(input: CreateOrderInput!): Order!
    updateOrder(id: ID!, input: UpdateOrderInput!): Order!
    deleteOrder(id: ID!): Boolean!
  }

  input AddressInput {
    street: String!
    city: String!
    state: String!
    zip: String!
    country: String!
  }

  input CreateAccountInput {
    name: String!
    type: String!
    industry: String!
    website: String!
    primaryContactId: ID
    billingAddress: AddressInput
  }

  input UpdateAccountInput {
    name: String
    type: String
    industry: String
    website: String
    primaryContactId: ID
    billingAddress: AddressInput
  }

  input CreateContactInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    title: String!
    accountId: ID!
    address: AddressInput!
  }

  input UpdateContactInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    title: String
    accountId: ID
    address: AddressInput
  }

  input CreateOrderInput {
    accountId: ID!
    items: [OrderItemInput!]!
  }

  input UpdateOrderInput {
    status: String
    items: [OrderItemInput!]
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
  }
`;
