if (localStorage.getItem("userLoggedIn") === "true") {
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
  const nomeUsuarioElement = document.getElementById("nameUserLogged");
  const userDataString = localStorage.getItem("userData");
  const voltsData = document.getElementById("voltsData");
  const amperesData = document.getElementById("amperesData");
  const wattsData = document.getElementById("wattsData");

  if (userDataString) {
    const userData = JSON.parse(userDataString);
    nomeUsuarioElement.textContent = `Olá, ${userData.nome}!`;
    const userID = userData.userId;
    console.log(userID);
    const wifiRef = firebase.database().ref("Usuario/" + userID + "/redeWifi");
    const moduloWifiRef = firebase
      .database()
      .ref("Usuario/" + userID + "/moduloWifi");
    const leituras = firebase.database().ref("Usuario/" + userID + "/leituras");

    wifiRef
      .once("value")
      .then((snapshot) => {
        const wifi = snapshot.val();
        console.log(wifi);
      })
      .catch((error) => {
        console.error("Erro ao acessar o banco de dados:", error);
      });

    moduloWifiRef
      .once("value")
      .then((snapshot) => {
        const modulo = snapshot.val();
        console.log(modulo);
      })
      .catch((error) => {
        console.error("Erro ao acessar o banco de dados:", error);
      });

    //  FUNÇÃO PARA ATUALIZAR OS VOLTS AMPARES E WATTS
    leituras
      .limitToLast(1)
      .once("value")
      .then((snapshot) => {
        const ultimaLeitura = snapshot.val();
        console.log(ultimaLeitura);
        if (ultimaLeitura) {
          for (const leituraID in ultimaLeitura) {
            const leitura = ultimaLeitura[leituraID];
            console.log(leitura);
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
  }
}

// FUNÇÃO PARA ATUALIZAR A BARRA DE PROGRESS
