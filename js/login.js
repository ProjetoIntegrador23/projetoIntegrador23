
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
  

const emailUsuario = document.querySelector('#email-user');
const senhaUsuario = document.querySelector('#password-user');
const buttonLogin = document.querySelector('#btn-formLogin');



buttonLogin.addEventListener("click", function(e){
    e.preventDefault();
    console.log("o botao foi clicado")
     loginUsuario(emailUsuario.value, senhaUsuario.value);
});

// function loginUsuario(email, senha){
//     firebase.auth().signInWithEmailAndPassword(email, senha).then(response => {
// console.log("deu certo")
//     }).catch(error => {
//         alert(getErrorMessage(error));
//     });
// }

// firebase.database().ref("Usuario").on("value", funciton(snapshot){
//     snapshot.forEach(function(item){
//         item.val().nome
// item.val().senha
//     })
// })