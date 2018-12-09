const { gql } = require('apollo-server-express');
exports.typeDefs = gql`
  type Author {
    id: String! # the ! means that every author object _must_ have an id
    firstName: String
    lastName: String
    posts: [Post] # the list of Posts by this author
  }
  type Post {
    id: String!
    title: String
    author: Author
    votes: Int
  }
  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: String!): Author
    authors: [Author]
  }
  # this schema allows the following mutation:
  type Mutation {
    upvotePost(postId: String!): Post
  }
`;
