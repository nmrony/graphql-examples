const Author = require('../models/author');
const Post = require('../models/post');
const { isEmpty } = require('../utils');
exports.resolvers = {
  Query: {
    posts() {
      return Post.list()
        .then(posts => posts)
        .catch(error => {
          throw error;
        });
    },
    authors() {
      return Author.list()
        .then(authors => authors)
        .catch(error => {
          throw error;
        });
    },
    author(_, { id }) {
      return Author.get(id)
        .then(author => author)
        .catch(error => {
          throw error;
        });
    }
  },
  Mutation: {
    upvotePost(_, { postId }) {
      return Post.get(postId)
        .then(post => {
          if (!post) {
            throw new Error('No post found');
          }
          const { id, ...others } = post;
          return Post.update(postId, {
            ...others,
            votes: others.votes + 1
          });
        })
        .then(() => Post.get(postId))
        .then(post => post)
        .catch(error => {
          throw error;
        });
    }
  },
  Author: {
    posts(author) {
      return Post.query({
        '==': [{ author: author.id }]
      })
        .then(posts => posts)
        .catch(error => {
          throw error;
        });
    }
  },
  Post: {
    author(post) {
      return Author.get(post.author)
        .then(author => author)
        .catch(error => {
          throw error;
        });
    }
  }
};
