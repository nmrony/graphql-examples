const fireStore = require('../dao/FireStoreDao');

module.exports = {
  list() {
    return fireStore
      .list('posts')
      .then(posts => posts)
      .catch(error => {
        throw error;
      });
  },

  query(queryConditions = {}) {
    return fireStore
      .query('posts', queryConditions)
      .then(posts => posts)
      .catch(error => {
        throw error;
      });
  },

  update(postId, data) {
    return fireStore
      .update('posts', postId, data)
      .then(post => post)
      .catch(error => {
        throw error;
      });
  },
  get(postId) {
    return fireStore
      .get('posts', postId)
      .then(post => post)
      .catch(error => {
        throw error;
      });
  }
};
