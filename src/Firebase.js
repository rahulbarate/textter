import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCE6YWvC0qvbu1GFPzeYVktEpiS24jJ9E0",
	authDomain: "textter-ce113.firebaseapp.com",
	projectId: "textter-ce113",
	storageBucket: "textter-ce113.appspot.com",
	messagingSenderId: "591658987377",
	appId: "1:591658987377:web:b4cc58b18085a4fa0990d0",
	measurementId: "G-R2QLELY960",
};

// initializing app
const firebaseApp = firebase.initializeApp(firebaseConfig);
// getting reference to database
const db = firebaseApp.firestore();

// getting authentication object
const auth = firebase.auth();

// getting google login as provider for authentication
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
