import express from 'express'
import { config as dotenvConfig } from 'dotenv'
import bodyParser from 'body-parser'
import compression from 'compression'
import { Engine } from 'apollo-engine'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import schema from './data/schema'

// initialize environment variables
dotenvConfig()

const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 3000
const CACHE_SIZE = process.env.APOLLO_CACHE_SIZE || 20971520 // 20MB
const graphQLServer = express()

const engine = new Engine({
  engineConfig: {
    apiKey: process.env.APOLLO_ENGINE_API_KEY,
    stores: [
      {
        name: 'inMemEmbeddedCache',
        inMemory: {
          cacheSize: CACHE_SIZE
        }
      }
    ],
    queryCache: {
      publicFullQueryStore: 'inMemEmbeddedCache'
    }
  },
  graphqlPort: GRAPHQL_PORT
})

engine.start()

// This must be the first middleware
graphQLServer.use(engine.expressMiddleware())
graphQLServer.use(compression())
graphQLServer.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    tracing: true,
    cacheControl: true
  })
)

graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`)
)
