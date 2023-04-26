import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD-F8i8qwArIN1lLhD44O7f-2TmT2FlQBU",
  authDomain: "amanda-nail-designer.firebaseapp.com",
  projectId: "amanda-nail-designer",
  storageBucket: "amanda-nail-designer.appspot.com",
  messagingSenderId: "53501491847",
  appId: "1:53501491847:web:7bf0b0e55dc4a4ba64d622",
  measurementId: "G-JYHE9S1HV5"
};

const db = initializeApp(firebaseConfig);
const analytics = getAnalytics(db);

export default db