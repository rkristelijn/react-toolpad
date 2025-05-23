/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-named-as-default-member */

import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import jsonServer from 'json-server';

import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/schema';

const app = express();
const jsonServerRouter = jsonServer.router('server/db.json');
const jsonServerMiddlewares = jsonServer.defaults();

// Enable CORS
app.use(cors());

// Use json-server middlewares
app.use(jsonServerMiddlewares);

// Mount json-server router at /api
app.use('/api', jsonServerRouter);

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    console.error('GraphQL Error:', error);
    return {
      message: error.message,
      path: error.path,
    };
  },
});

async function startServer() {
  try {
    await server.start();

    // Apply middleware with type assertion
    server.applyMiddleware({
      app: app as any,
      path: '/graphql',
      cors: false, // We're handling CORS with the express middleware
    });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}`);
      console.log(`🚀 GraphQL endpoint: http://localhost:${PORT}/graphql`);
      console.log(`🚀 REST API endpoint: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer().catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
});
