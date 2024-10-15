import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3CMyI9XJZANDrAP24HVyQmqKTBYQWbro",
  authDomain: "manely-y-dani.firebaseapp.com",
  projectId: "manely-y-dani",
  storageBucket: "manely-y-dani.appspot.com",
  messagingSenderId: "138386640431",
  appId: "1:138386640431:web:7d872f0d60eba3e26b00da"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { db };