// src/firebase/firebase.js

import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
  // Your Firebase configuration object
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export const requestFirebaseNotificationPermission = () => 
  messaging.requestPermission()
    .then(() => messaging.getToken())
    .then((firebaseToken) => {
      console.log("Firebase token received:", firebaseToken);
      return firebaseToken;
    })
    .catch((err) => {
      console.error("Error getting permission or token for notifications", err);
    });

export default firebase;
