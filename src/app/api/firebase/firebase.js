// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcQd_V801FGZNkCxDdLL6rVMs4mN04sqM",
  authDomain: "klt-mark-2.firebaseapp.com",
  projectId: "klt-mark-2",
  storageBucket: "klt-mark-2.appspot.com",
  messagingSenderId: "267883623835",
  appId: "1:267883623835:web:b28efa6bba65602bbb9d3e",
  measurementId: "G-C8Q7GMY2MQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };