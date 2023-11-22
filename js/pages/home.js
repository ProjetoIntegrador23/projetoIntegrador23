if (localStorage.getItem("userLoggedIn") === "true") {
  const userDataString = localStorage.getItem("userData");
  if (userDataString) {
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
    const nomeUsuarioElement = document.getElementById("nameUserLogged");

    const voltsData = document.getElementById("voltsData");
    const amperesData = document.getElementById("amperesData");
    const wattsData = document.getElementById("wattsData");

    const userData = JSON.parse(userDataString);
    const userID = userData.userId;

    const userRef = firebase.database().ref("Usuario/" + userID);
    userRef
      .once("value")
      .then((snapshot) => {
        const usuario = snapshot.val();

        nomeUsuarioElement.textContent = `Olá, ${usuario.name}!`;
      })
      .catch((error) => {
        console.error("Erro ao acessar os dados do usuário!:", error);
      });

    const wifiRef = firebase.database().ref("Usuario/" + userID + "/redeWifi");
    const moduloWifiRef = firebase
      .database()
      .ref("Usuario/" + userID + "/moduloWifi");
    const leituras = firebase.database().ref("Usuario/" + userID + "/leituras");

    //  FUNÇÃO PARA ATUALIZAR OS VOLTS AMPARES E WATTS
    leituras
      .limitToLast(1)
      .once("value")
      .then((snapshot) => {
        const ultimaLeitura = snapshot.val();
  
        if (ultimaLeitura) {
          for (const leituraID in ultimaLeitura) {
            const leitura = ultimaLeitura[leituraID];
            voltsData.textContent = `${leitura.volts} Volts (V)`;
            amperesData.textContent = `${leitura.amperes} Amperes (A)`;
            wattsData.textContent = `${leitura.watts} Watts (W)`;
          }
        } else {
          voltsData.textContent = `Nenhum valor registrado`;
          amperesData.textContent = `Nenhum valor registrado`;
          wattsData.textContent = `Nenhum valor registrado`;
        }
      })
      .catch((error) => {
        console.error("Erro ao acessar o banco de dados:", error);
      });

    // FUNÇÃO PARA ATUALIZAR A BARRA DE PROGRESS
    const metaRef = firebase
      .database()
      .ref("Usuario/" + userID + "/metaConsumo");
    metaRef
      .once("value")
      .then((snapshot) => {
        const meta = snapshot.val();
        // if (meta) {

        // } 
      })
      .catch((error) => {
        console.error("Erro ao acessar o banco de dados:", error);
      });
  }
} else {
  alert("Usuário não logado!");
  setTimeout(function () {
    window.location.href = "../index.html";
  }, 500);
}
