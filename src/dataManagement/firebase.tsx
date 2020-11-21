import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAkpO-CJ4QksZVd8A6wXHZT0orB1Jbxlyw',
  authDomain: 'mysportapp-af5d2.firebaseapp.com',
  databaseURL: 'https://mysportapp-af5d2.firebaseio.com',
  projectId: 'mysportapp-af5d2',
  storageBucket: 'mysportapp-af5d2.appspot.com',
  messagingSenderId: '309626712740',
  appId: '1:309626712740:web:5d3ad93680d4d2da3f2c31',
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export function addUser() {
  console.log('addUser');
  firebase
    .database()
    .ref('users/' + 123)
    .set({
      name: 'dupa',
    });
}

const dbh = firebase.firestore();

export function addUser2() {
  console.log('addUser2', dbh);
  dbh
    .collection('characters')
    .doc('mario')
    .set({
      employment: 'plumber',
      outfitColor: 'red',
      specialAttack: 'fireball',
    });
}
