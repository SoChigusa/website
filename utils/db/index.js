// import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
let firebaseApp, database;

// server-side
if (typeof window === "undefined") {
  // console.log('run on server-side.')
  const admin = require("firebase-admin");
  const { getFirestore } = require("firebase-admin/firestore");
  if (!admin.apps.length) {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FSA_PROJECT_ID,
        privateKey: process.env.FSA_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FSA_CLIENT_EMAIL,
      }),
    });
  } else {
    firebaseApp = admin.app();
  }

  database = getFirestore();

  // client-side
} else {
  // console.log('run on client-side.');
  const firebase = require("firebase/app");
  const { getFirestore } = require("firebase/firestore");
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };
  firebaseApp = firebase.initializeApp(firebaseConfig);
  database = getFirestore(firebaseApp);

  // anonymous authentication
  // const auth = getAuth(firebaseApp);
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     uid = user.uid;
  //   }
  // });
  // signInAnonymously(auth)
  //   .catch(error => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     window.alert(error, ": ", errorMessage);
  //   });
}

export { database };