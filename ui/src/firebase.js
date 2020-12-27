import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAy0LYYRq6AGIZ7mmRpKwCtpzr9d7y-K9o',
  authDomain: 'photo-app-c5f41.firebaseapp.com',
  databaseURL: 'https://photo-app-c5f41.firebaseio.com',
  projectId: 'photo-app-c5f41',
  storageBucket: 'photo-app-c5f41.appspot.com',
  messagingSenderId: '1008326348104',
  appId: '1:1008326348104:web:47b3e5517266ad95e3b77d',
  measurementId: 'G-W0C6R2H572',
};

firebase.initializeApp(firebaseConfig);

export default firebase