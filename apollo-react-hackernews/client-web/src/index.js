import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import './index.css'
import { App } from './components/App'

// create the link
const uri = 'http://localhost:4000'
const httpLink = new HttpLink({ uri })

// create Apollo client
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const HackerNewsApp = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
)

ReactDOM.render(<HackerNewsApp />, document.getElementById('root'))
registerServiceWorker()
