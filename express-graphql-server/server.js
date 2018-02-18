import express from 'express'
import graphqlHTTP from 'express-graphql'

import schema from './data/schema'

const PORT = process.env.NODE_PORT || 3000

const graphQLServer = express()

graphQLServer.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

graphQLServer.listen(PORT, () => console.log(`GraphQL server is istening to http://localhost:${PORT}`))