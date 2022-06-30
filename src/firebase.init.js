// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzbJBkLb56B4e17-Yqc0heBJecDelQBIc",
  authDomain: "crave-tasks.firebaseapp.com",
  projectId: "crave-tasks",
  storageBucket: "crave-tasks.appspot.com",
  messagingSenderId: "294834702339",
  appId: "1:294834702339:web:1207ebda0f8d6951eba636"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;