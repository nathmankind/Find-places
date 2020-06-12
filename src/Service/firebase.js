import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAUJ4B9OrhQqOqOqqCNrRhw_Ic4OfuGh5o",
  authDomain: "firestore-places.firebaseapp.com",
  databaseURL: "https://firestore-places.firebaseio.com",
  projectId: "firestore-places",
  storageBucket: "firestore-places.appspot.com",
  messagingSenderId: "593182183445",
  appId: "1:593182183445:web:02ea48f46d0c756c15fe1c",
  measurementId: "G-B7TGTCZFKM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
