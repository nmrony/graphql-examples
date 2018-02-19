import fetchInfo from './connector'
import { GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectType } from 'graphql'

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'Book list of an author',
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: json => json.title[0]
    },
    isbn: {
      type: GraphQLString,
      resolve: json => json.isbn[0]
    }
  })
})
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'Author of the book',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: json => json.GoodreadsResponse.author[0].name[0]
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: json => json.GoodreadsResponse.author[0].books[0].book
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
      }
    })
  })
})
