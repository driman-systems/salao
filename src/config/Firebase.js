import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-F8i8qwArIN1lLhD44O7f-2TmT2FlQBU",
  authDomain: "amanda-nail-designer.firebaseapp.com",
  projectId: "amanda-nail-designer",
  storageBucket: "amanda-nail-designer.appspot.com",
  messagingSenderId: "53501491847",
  appId: "1:53501491847:web:7bf0b0e55dc4a4ba64d622",
  measurementId: "G-JYHE9S1HV5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);

export { auth, provider, firestore };

