import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCTdz_N_aBZyBofNjzwPjTN-oXwvL6edz0",
    authDomain: "facebook-messenger-99f2a.firebaseapp.com",
    projectId: "facebook-messenger-99f2a",
    storageBucket: "facebook-messenger-99f2a.appspot.com",
    messagingSenderId: "728030101928",
    appId: "1:728030101928:web:cd270d663b1ed2722f5d9d"
});

const db = firebaseApp.firestore();

export default db;