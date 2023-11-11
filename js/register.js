function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

const firebaseConfig = {
  apiKey: "AIzaSyBOlATv13ZOA_pmmCwfh-iH2EvuI7-PDuM",
  authDomain: "meuconsumodeenergiaweb.firebaseapp.com",
  databaseURL: "https://meuconsumodeenergiaweb-default-rtdb.firebaseio.com",
  projectId: "meuconsumodeenergiaweb",
  storageBucket: "meuconsumodeenergiaweb.appspot.com",
  messagingSenderId: "376629492849",
  appId: "1:376629492849:web:984c2d29d8427a42d6afd0",
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const auth = firebase.auth();

const nomeUsuario = document.querySelector("#nameUser");
const emailUsuario = document.querySelector("#userEmail");
const senhaUsuario = document.querySelector("#userPassword");
const redeWifi = document.querySelector("#nameRede");
const senhaWifi = document.querySelector("#senhaRede");
const moduloWifi = document.querySelector("#enderecoMacEsp");
const buttonForm = document.querySelector(".btn-register");

buttonForm.addEventListener("click", function (e) {
  createUsuario(
    nomeUsuario.value,
    emailUsuario.value,
    senhaUsuario.value,
    redeWifi.value,
    senhaWifi.value,
    moduloWifi.value
  );
  validateEmail(emailUsuario.value)
  e.preventDefault();
  setTimeout(function() {
    window.location.href = "../login.html";
  }, 3000);
});

function createUsuario(name, email, senha, rede, senhaRede, modulo) {
  const data = {
    name: name,
    email: email,
    senha: senha,
    rede: rede,
    senhaRede: senhaRede,
    modulo: modulo,
  };

  return firebase.database().ref().child("Usuario").push(data);
}

console.log(firebase.database().ref("Usuario"));