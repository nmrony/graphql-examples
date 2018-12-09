const express = require('express');
const functions = require('firebase-functions');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./data/schema');
const { resolvers } = require('./data/resolvers');
const app = express();

const server = new ApolloServer({ typeDefs, resolvers, introspection: true, playground: true });
server.applyMiddleware({ app, path: '/v1/graphql' });

exports.api = functions.https.onRequest(app);
