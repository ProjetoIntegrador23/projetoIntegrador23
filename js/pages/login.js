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
const emailUsuario = document.querySelector("#email-user");
const senhaUsuario = document.querySelector("#password-user");
const buttonLogin = document.querySelector("#btn-formLogin");

buttonLogin.addEventListener("click", function (e) {
  e.preventDefault();
  loginUser(emailUsuario.value, senhaUsuario.value);
});

function loginUser(email, password) {
  const usersRef = firebase.database().ref("Usuario");
  usersRef
    .once("value")
    .then((snapshot) => {
      const users = snapshot.val();
      for (const userId in users) {
        const user = users[userId];
        console.log(userId);
        if (user.email === email && user.senha === password) {
          localStorage.setItem("userLoggedIn", "true");
          const userData = {
            userId: userId,
            nome: user.name,
            email: user.email,
            rede: user.rede,
            senhaRede: user.senhaRede,
            modulo: user.modulo,
          };
          const userDataJson = JSON.stringify(userData);
          localStorage.setItem("userData", userDataJson);
          setTimeout(function () {
            window.location.href = "../home.html";
          }, 1000);
        } else {
          console.log("Credenciais inválidas.");
        }
      }
    })
    .catch((error) => {
      console.error("Erro ao acessar o banco de dados:", error);
    });
}
