// src/index.js
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { initializeApp } from "@firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";


const firebaseConfig = {
  apiKey: "AIzaSyBOlATv13ZOA_pmmCwfh-iH2EvuI7-PDuM",
  authDomain: "meuconsumodeenergiaweb.firebaseapp.com",
  databaseURL: "https://meuconsumodeenergiaweb-default-rtdb.firebaseio.com",
  projectId: "meuconsumodeenergiaweb",
  storageBucket: "meuconsumodeenergiaweb.appspot.com",
  messagingSenderId: "376629492849",
  appId: "1:376629492849:web:984c2d29d8427a42d6afd0"
};

const firebaseApp = initializeApp({ firebaseConfig });
const db = getFirestore(firebaseApp);
async function loadCity(name) {
  const cityDoc = doc(db, `cities/${name}`);
  const snapshot = await getDoc(cityDoc);
  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}
