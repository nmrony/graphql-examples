import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { GraphQLServer } from 'graphql-yoga';
import { importSchema } from 'graphql-import';
import { resolvers } from './resolvers';
import { resolve } from 'path';

const typeDefs = importSchema(resolve(__dirname, 'schema.graphql'));
export const startServer = async () => {
  const server = new GraphQLServer({ typeDefs, resolvers });
  try {
    await createConnection();
    await server.start();
    console.log('Server is running on localhost:4000');
  } catch (exception) {
    console.log('Error occurred: ', exception);
  }
};

startServer();
