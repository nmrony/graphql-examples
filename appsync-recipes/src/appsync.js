const appSyncConfig = {
  graphqlEndpoint: process.env.APPSYNC_API_URL || null,
  region: process.env.AWS_REGION,
  authenticationType: process.env.APPSYNC_AUTH_TYPE || 'API_KEY',
  apiKey: process.env.APPSYNC_API_KEY
}

export default appSyncConfig