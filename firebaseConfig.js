import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDv-26Dj94hVN8vbfGQlTM9oHHt4BfNTaY",
  authDomain: "spotfy-2bab1.firebaseapp.com",
  projectId: "spotfy-2bab1",
  storageBucket: "spotfy-2bab1.firebasestorage.app",
  messagingSenderId: "1006733681650",
  appId: "1:1006733681650:web:58909d76dcc7c82766416b",
  measurementId: "G-CR9J5QX3EG"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);