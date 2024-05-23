import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBNlhhuaFZ8yZZ75GLH6TIghl7cfQ-6b9M",
  authDomain: "walphams.firebaseapp.com",
  projectId: "walphams",
  storageBucket: "walphams.appspot.com",
  messagingSenderId: "512442115787",
  appId: "1:512442115787:web:5d0da674fcd33b9383dd4e",
  measurementId: "G-208K60KLV3"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Función para agregar un documento a la colección de usuarios
const addUserDocument = async (userData) => {
  try {
    // Añadir documento a la colección 'users'
    const docRef = await addDoc(collection(db, 'users'), userData);
    console.log('Documento añadido con ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error al añadir documento: ', error);
    throw error;
  }
};

export { auth, db, addUserDocument };