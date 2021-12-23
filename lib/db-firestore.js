import firebase from './firebase';

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true }); // merge make sur id is unique
}

export function createSite(data) {
  // let firestore generate an id -- so use add() instead of set (), if using set(), we need to mention doc() first
  return firestore.collection('sites').add(data);
}