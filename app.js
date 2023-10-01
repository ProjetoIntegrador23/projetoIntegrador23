const firebase = require('firebase/app');
require('firebase/database'); 

const config = {
    apiKey: "AIzaSyBOlATv13ZOA_pmmCwfh-iH2EvuI7-PDuM",
    authDomain: "meuconsumodeenergiaweb.firebaseapp.com",
    databaseURL: "https://meuconsumodeenergiaweb-default-rtdb.firebaseio.com",
    projectId: "meuconsumodeenergiaweb",
    storageBucket: "meuconsumodeenergiaweb.appspot.com",
    messagingSenderId: "376629492849",
    appId: "1:376629492849:web:984c2d29d8427a42d6afd0",
  };

firebase.initializeApp(config);