const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

module.exports = {
  list(collectionName) {
    return db
      .collection(collectionName)
      .get()
      .then(snapshot => {
        const docs = [];
        snapshot.forEach(doc => docs.push({ id: doc.id, ...doc.data() }));
        return docs;
      })
      .catch(error => {
        throw error;
      });
  },
  query(collectionName, queryParams) {
    const collRef = db.collection(collectionName);
    let queryRef = collRef;
    Object.entries(queryParams).forEach(([operator, fields]) => {
      fields.forEach(data => {
        const [fieldPath, fieldValue] = Object.entries(data).pop();
        queryRef = queryRef.where(fieldPath, operator, fieldValue);
      });
    });
    return queryRef.get().then(snapshot => {
      const docs = [];
      snapshot.forEach(doc => docs.push({ id: doc.id, ...doc.data() }));
      return docs;
    });
  },

  update(collectionName, docId, data) {
    const collRef = db.collection(collectionName).doc(docId);
    return collRef
      .update(data)
      .then(doc => {
        console.log('Doc', doc);
        return doc;
      })
      .catch(error => {
        throw error;
      });
  },
  get(collectionName, docId, returnDocRef = false) {
    return db
      .collection(collectionName)
      .doc(docId)
      .get()
      .then(doc => ((doc.exists && returnDocRef && doc) || doc.exists ? { id: doc.id, ...doc.data() } : null))
      .catch(error => {
        throw error;
      });
  }
};
