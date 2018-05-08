import * as firebase from 'firebase';
import _ from 'lodash';
import moment, { unix } from 'moment';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

const databasetags = firebase.database().ref('tags/');

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const databaseUsers = firebase.database().ref('users/');


export { firebase, googleAuthProvider, databasetags, database as default};

