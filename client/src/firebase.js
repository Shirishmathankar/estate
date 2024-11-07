import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM4C0gPj0MydZZxNJ3k1LnZ9YQEyVhLYE",
  authDomain: "mern-state-5d178.firebaseapp.com",
  projectId: "mern-state-5d178",
  storageBucket: "mern-state-5d178.firebasestorage.app",
  messagingSenderId: "157463902770",
  appId: "1:157463902770:web:4e8313a71ad96b647ada2b",
  measurementId: "G-MTCTCZJVM2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics=getAnalytics(app);
