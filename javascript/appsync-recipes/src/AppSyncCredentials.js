import { config } from 'dotenv'

// load environment variables
config()

const appSyncConfig = {
  graphqlEndpoint: process.env.REACT_APP_APPSYNC_API_URL || null,
  region: process.env.REACT_APP_AWS_REGION || 'us-east-2',
  authenticationType: process.env.REACT_APP_APPSYNC_AUTH_TYPE || 'API_KEY',
  apiKey: process.env.REACT_APP_APPSYNC_API_KEY
}

export default appSyncConfig
