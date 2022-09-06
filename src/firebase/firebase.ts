// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB4v4w-6R8CLGLGfYHizs9BJODakZoMj4",
  authDomain: "todo-app-3d21f.firebaseapp.com",
  projectId: "todo-app-3d21f",
  storageBucket: "todo-app-3d21f.appspot.com",
  messagingSenderId: "662848483284",
  appId: "1:662848483284:web:8f3de11008ad3e696eb041",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
