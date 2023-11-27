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
    const textMeta = document.getElementById("metaUsuarioDefinida");
    const textAtingirMeta = document.getElementById("qtdAtingirMeta");

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
    function updateProgress(progress, total) {
      const progressBar = document.querySelector(".progress-bar__indicator");
      const percentage = (progress / total) * 100;
      progressBar.style.width = percentage + "%";
      if (percentage < 50) {
        progressBar.style.backgroundColor = "#07D227";
      }
      if (percentage > 50 && percentage < 101) {
        progressBar.style.backgroundColor = "#F7D90F";
      }
      if (percentage > 100) {
        progressBar.style.backgroundColor = "#D20707";
      }
    }

    const metaRef = firebase
      .database()
      .ref("Usuario/" + userID + "/metaConsumo");
    metaRef
      .once("value")
      .then((snapshot) => {
        const meta = snapshot.val();
        if (meta) {
          const valueMeta = meta.meta;
          const tipoMeta = meta.tipoMeta;

          const leituras = firebase
            .database()
            .ref("Usuario/" + userID + "/leituras");

          const dataAtual = new Date();
          const mesAtual = dataAtual.getMonth() + 1;

          if (tipoMeta === "volts") {
            textMeta.textContent = `${valueMeta} Volts`;
            leituras.once("value", (snapshot) => {
              let totalVolts = 0;
              snapshot.forEach((childSnapshot) => {
                const leitura = childSnapshot.val();
                const leituraData = leitura.data;
                const mesLeitura = parseInt(leituraData.split("-")[1]);
                if (mesLeitura === mesAtual) {
                  const voltsValue =
                    leitura.volts !== "" ? parseFloat(leitura.volts) : 0;
                  totalVolts += voltsValue;
                }
              });
              updateProgress(totalVolts, valueMeta);
              if (totalVolts < valueMeta) {
                let valorAtualMeta = valueMeta - totalVolts;
                textAtingirMeta.textContent = `Você tem ainda: ${valorAtualMeta.toFixed(
                  2
                )} volts para atingir a meta.`;
              } else {
                let valorAtualMeta = totalVolts - valueMeta;
                textAtingirMeta.textContent = `Você já usou: ${valorAtualMeta.toFixed(
                  2
                )} volts da sua meta definida.`;
              }
            });
          } else if (tipoMeta === "watts") {
            textMeta.textContent = `${valueMeta} Watts`;
            leituras.once("value", (snapshot) => {
              let totalWatts = 0;
              snapshot.forEach((childSnapshot) => {
                const leitura = childSnapshot.val();
                const leituraData = leitura.data;
                const mesLeitura = parseInt(leituraData.split("-")[1]);
                if (mesLeitura === mesAtual) {
                  const wattsValue =
                    leitura.watts !== "" ? parseFloat(leitura.watts) : 0;
                  totalWatts += wattsValue;
                }
              });
              updateProgress(totalWatts, valueMeta);
              if (totalWatts < valueMeta) {
                let valorAtualMeta = valueMeta - totalWatts;
                textAtingirMeta.textContent = `Você tem ainda: ${valorAtualMeta.toFixed(
                  2
                )} watts para atingir a meta.`;
              } else {
                let valorAtualMeta = totalWatts - valueMeta;
                textAtingirMeta.textContent = `Você já usou: ${valorAtualMeta.toFixed(
                  2
                )} watts da sua meta definida.`;
              }
            });
          }
        } else {
          textMeta.textContent = "Você ainda não definiu uma meta de consumo!";
          textAtingirMeta.textContent =
            "Cadastre uma meta de consumo no perfil do usuário :)";
        }
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
