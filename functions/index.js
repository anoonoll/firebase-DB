const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.registerUsers = functions.auth.user().onCreate((user) => {
    const { uid } = user;
    const db = admin.firestore();
    const displayName = user.displayName || 'Anonymous';
    const email = user.email || '';
    const photoURL = user.photoURL || '/assets/img/default_profile.svg';
  
    return db.collection('users').doc(uid).set({
      user_name: displayName,
      photo_url: photoURL,
      email,
      create_on: new Date(),
    })
      .then(() => {
        console.log('Success'); // eslint-disable-line no-console
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line no-console
      });
});
