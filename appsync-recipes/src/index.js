import React from 'react'
import ReactDOM from 'react-dom'
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import { ApolloProvider } from 'react-apollo'
import registerServiceWorker from './registerServiceWorker'

import './index.css'
import { App } from './App'
import appSyncConfig from './appsync'

// create Apollo client for AppSync
const client = new AWSAppSyncClient({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    apiKey: appSyncConfig.apiKey
  }
})

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated
      render={({ rehydrated }) => (
        rehydrated ? <App /> : <div className="loader"></div>
      )}
    />
  </ApolloProvider>
);

ReactDOM.render(<WithProvider />, document.getElementById('root'))
registerServiceWorker()
