import admin from 'firebase-admin'; // package firebase-admin

// import serviceAccount from '../feedbacker-demo-firebase-adminsdk.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    })
  });
}

// get the auth for Token user check, and the firestore
const auth = admin.auth();
const db = admin.firestore();
export { auth, db };
