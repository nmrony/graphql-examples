import fetchInfo from './connector'
import { GraphQLSchema, GraphQLInt, GraphQLString, GraphQLObjectType } from 'graphql'

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'Author of the book',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: json => json.GoodreadsResponse.author[0].name[0]
    }
  })
})

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'Queries for GraphQL server',
    fields: () => ({
      author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) => fetchInfo(args.id)
      },
    })
  })
})
