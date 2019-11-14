import express from 'express'
import bodyParser from 'body-parser'
import filter from 'lodash.filter'
import { makeExecutableSchema } from 'graphql-tools'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

// make fake data
const bookList = [
  {
    id: 1,
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling'
  },
  {
    id: 3,
    title: "Harry Potter and the Prisoner of Azkabaan",
    author: 'J.K. Rowling'
  },
  {
    id: 2,
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
]

const typeDefinitions = `
 type Query {
   books(id: Int, author: String): [Book],
   allBooks: [Book]
  }
 type Book { id: Int, title: String, author: String }
`

const resolvers = {
  Query: {
    books: (_, book) => filter(bookList, book),
    allBooks: () => bookList
  }
}

const schema = makeExecutableSchema({ typeDefs: typeDefinitions, resolvers })

const graphqlServer = express()

// The GraphQL endpoint
graphqlServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

// GraphiQL, a visual editor for queries
graphqlServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

graphqlServer.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!')
})
