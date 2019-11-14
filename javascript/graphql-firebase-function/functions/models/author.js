const fireStore = require('../dao/FireStoreDao');

module.exports = {
  list() {
    return fireStore
      .list('authors')
      .then(authors => authors)
      .catch(error => {
        throw error;
      });
  },
  get(authorId) {
    return fireStore
      .get('authors', authorId)
      .then(author => author)
      .catch(error => {
        throw error;
      });
  }
};
