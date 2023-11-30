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

    // DADOS DE DATA
    let date = new Date(),
      currYear = date.getFullYear(),
      currMonth = date.getMonth(),
      diaAtual = date.getDate();

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

    //  FUNÇÃO PARA ATUALIZAR OS VOLTS AMPARES E WATTS
    const leiturasRef = firebase
      .database()
      .ref("Usuario/" + userID + "/leituras");

    leiturasRef.on("value", (snapshot) => {
      const leitura = snapshot.val();
      for (const leituraData in leitura) {
        const leituraAtual = leitura[leituraData];
        const dataFormat = new Date(currYear, currMonth, diaAtual);
        const atualData = formatDate(dataFormat);
        if (leituraData === atualData) {
          const leituraAmpere = leituraAtual.Ampere;
          const leituraVolts = leituraAtual.Volts;
          const leituraWatts = leituraAtual.Watts;
          $("#voltsData").text("" + leituraVolts + " Volts(V)");
          $("#amperesData").text("" + leituraAmpere + " Ampere(A)");
          $("#wattsData").text("" + leituraWatts + " Watts(W)");
        }
      }
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
          if (tipoMeta === "watts") {
            textMeta.textContent = `${valueMeta} Watts`;
            leituras.on("value", (snapshot) => {
              let totalWatts = 0;
              const leitura = snapshot.val();
              for (const leituraData in leitura) {
                const leituraAtual = leitura[leituraData];
                const mesLeitura = parseInt(leituraData.split("-")[1]);
                if (mesLeitura === mesAtual) {
                  const wattsValue =
                    leituraAtual.Watts !== ""
                      ? parseFloat(leituraAtual.Watts)
                      : 0;
                  totalWatts += wattsValue;
                }
              }
              updateProgress(totalWatts, valueMeta);
              if (totalWatts < valueMeta) {
                let valorAtualMeta = valueMeta - totalWatts;
                $("#qtdAtingirMeta").text(
                  `Você tem ainda: ${valorAtualMeta.toFixed(
                    2
                  )} watts para atingir a meta.`
                );
              } else {
                let valorAtualMeta = totalWatts - valueMeta;
                $("#qtdAtingirMeta").text(
                  `Você já usou: ${valorAtualMeta.toFixed(
                    2
                  )} watts da sua meta definida.`
                );
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

    // FORMATAR DATA
    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  }
} else {
  alert("Usuário não logado!");
  setTimeout(function () {
    window.location.href = "../index.html";
  }, 500);
}
