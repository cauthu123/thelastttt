import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase, onValue } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDTrACWGa0IDRhZYNTYicDDLRR-7xBJH2Y",
    authDomain: "cardlink-3bd0a.firebaseapp.com",
    databaseURL: "https://cardlink-3bd0a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cardlink-3bd0a",
    storageBucket: "cardlink-3bd0a.appspot.com",
    messagingSenderId: "82452055217",
    appId: "1:82452055217:web:0aba023c2d8470697ece90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
