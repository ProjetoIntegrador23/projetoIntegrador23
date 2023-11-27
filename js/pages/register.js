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
const nomeUsuario = document.querySelector("#nameUser");
const emailUsuario = document.querySelector("#userEmail");
const senhaUsuario = document.querySelector("#userPassword");
const redeWifi = document.querySelector("#nameRede");
const senhaWifi = document.querySelector("#senhaRede"); 
const moduloWifi = document.querySelector("#enderecoMacEsp");
const buttonForm = document.querySelector(".btn-register");

function encryptPassword(password, secretKey) {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
}
buttonForm.addEventListener("click", function (e) {
  const encryptedPassword = encryptPassword(senhaUsuario.value, 'pR0Jet01nt&gr@d0R02!');
  const encryptedPasswordRede = encryptPassword(senhaWifi.value, 'pR0Jet01nt&gr@d0R02!');

  const newUsuario = createUsuario(
    nomeUsuario.value,
    emailUsuario.value,
    encryptedPassword,
    redeWifi.value,
    encryptedPasswordRede,
    moduloWifi.value
  );
  validateEmail(emailUsuario.value);
  e.preventDefault();
  if (newUsuario) {
    alert("Se cadastro foi realizado com sucesso!");
    setTimeout(function () {
      window.location.href = "../login.html";
    }, 1000);
  } else {
    alert("Não foi possivel realizar o seu cadastro :(");
  }
});

function createUsuario(name, email, senha, rede, senhaRede, modulo) {
  const newUserID = firebase.database().ref().child("Usuario").push().key;
  const userData = {
    userId: newUserID,
    name: name,
    email: email,
    senha: senha,
    redeWifi: {
      rede: rede,
      senhaRede: senhaRede,
    },
    moduloWifi: {
      modulo: modulo,
    },
  };
  firebase.database().ref(`Usuario/${newUserID}`).set(userData);

  return 1;
}


