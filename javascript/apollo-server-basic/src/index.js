const { ApolloServer, gql } = require("apollo-server");

// Dummy Data
const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

const typeDefs = gql`
  type Author {
    name: String
    books: [Book]
  }

  type Book {
    title: String
    author: Author
  }

  type Query {
    books: [Book]
    authors: [Author]
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

const resolvers = {
  Query: {
    books(parent, args, context, info) {
      return books;
    },
    authors(parent, args, context, info) {
      console.log(parent);
      return books.map(book => ({
        name: book.author,
        books: [book]
      }));
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
