import * as admin from 'firebase-admin';
import * as serviceAccount from './apex-464b5-firebase-adminsdk-sm379-105cd4e6c5.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: "https://<apex-back-end>.firebaseio.com" // Ensure this URL is correct
});

const db = admin.firestore();

export default db;
