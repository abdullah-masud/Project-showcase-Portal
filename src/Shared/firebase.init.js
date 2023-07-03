// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCuSjF-urBqyBD_64PdDWBKcHu3d4MMIm8",
    authDomain: "project-showcase-portal.firebaseapp.com",
    projectId: "project-showcase-portal",
    storageBucket: "project-showcase-portal.appspot.com",
    messagingSenderId: "850697095412",
    appId: "1:850697095412:web:92c63d0f6700162d1df6a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app