import { compareDesc, parseISO } from 'date-fns';
import firebase from './firebase-admin';

// firebase admin server side

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await firebase
      .collection('feedback')
      .where('siteId', '==', siteId)
      // .orderBy('createdAt', 'desc') // cannot add it, need to set index if we want to use multiple request....
      .get();

    const feedback = [];

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    //Order by createdAt
    feedback.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return { feedback };
  } catch (error) {
    return { error };
  }
}

export async function getAllSites() {
  try {
    const snapshot = await firebase.collection('sites').get();
    const sites = [];

    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });

    return { sites };
  } catch (error) {
    return { error };
  }
}
