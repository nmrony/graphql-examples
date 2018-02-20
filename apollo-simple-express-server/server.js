import express from 'express'
import bodyParser from 'body-parser'
import { makeExecutableSchema } from 'graphql-tools'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

// make some data
const bookList = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const typeDefinitions = `
 type Query { books: [Book] }
 type Book { title: String, author: String }
`

const resolvers = {
  Query: {
    books: () => bookList
  }
}

const schema = makeExecutableSchema({ typeDefs: typeDefinitions, resolvers })

const graphqlServer = express()

// The GraphQL endpoint
graphqlServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema,  }));

// GraphiQL, a visual editor for queries
graphqlServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphqlServer.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
