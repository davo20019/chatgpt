import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

export default async function handler(req, res) {
    const visitorCountRef = database.ref('visitorCount');

    if (req.method === 'GET') {
        const snapshot = await visitorCountRef.once('value');
        const count = snapshot.val() || 0;
        res.status(200).json({ count });
    } else if (req.method === 'POST') {
        await visitorCountRef.transaction((currentCount) => {
            return (currentCount || 0) + 1;
        });
        res.status(200).json({ message: 'Count incremented' });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
