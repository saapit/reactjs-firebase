import firebase from 'firebase/app';
import 'firebase/auth';
// import 'firebase/firestore';

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDBGpE29QYV0CLmx78BOYJd-Y1bamyse8w",
    authDomain: "simple-note-firebase-8b879.firebaseapp.com",
    projectId: "simple-note-firebase-8b879",
    storageBucket: "simple-note-firebase-8b879.appspot.com",
    messagingSenderId: "447422320580",
    appId: "1:447422320580:web:451336219d308fb2b81e91",
    measurementId: "G-VFFXPP8RDM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();


  export default firebase;