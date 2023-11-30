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
    const auth = firebase.auth();
    const userData = JSON.parse(userDataString);
    const userID = userData.userId;

    // CALENDÁRIO DINÂMICO
    const daysTag = document.querySelector(".days"), // Seleciona o elemento HTML com a classe "days"
      currentDate = document.querySelector(".current-date"), // Seleciona o elemento HTML com a classe "current-date"
      prevNextIcon = document.querySelectorAll(".icons i"); // Seleciona todos os elementos HTML com a classe "icons" e a tag "span"

    // Obtendo a nova data, o ano atual e o mês atual
    let date = new Date(), // Cria um objeto Date para a data atual
      currYear = date.getFullYear(), // Obtém o ano atual
      currMonth = date.getMonth(); // Obtém o mês atual

    // Armazenando o nome completo de todos os meses em um array
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const renderCalendar = () => {
      // Obtendo o primeiro dia do mês
      let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
      // Obtendo o último dia do mês
      let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
      // Obtendo o último dia do mês
      let lastDayofMonth = new Date(
        currYear,
        currMonth,
        lastDateofMonth
      ).getDay();
      // Obtendo o último dia do mês anterior
      let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

      let liTag = "";

      for (let i = firstDayofMonth; i > 0; i--) {
        // Criando elementos <li> para os últimos dias do mês anterior
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
      }

      for (let i = 1; i <= lastDateofMonth; i++) {
        // Criando elementos <li> para todos os dias do mês atual
        let isToday =
          i === date.getDate() &&
          currMonth === new Date().getMonth() &&
          currYear === new Date().getFullYear()
            ? "active"
            : "";
        liTag += `<li class="${isToday}">${i}</li>`;
      }

      for (let i = lastDayofMonth; i < 6; i++) {
        // Criando elementos <li> para os primeiros dias do próximo mês
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
      }

      currentDate.innerText = `${months[currMonth]} ${currYear}`;
      daysTag.innerHTML = liTag;
    };

    renderCalendar(); // Chamando a função renderCalendar para renderizar o calendário

    prevNextIcon.forEach((icon) => {
      // Adicionando um evento de clique aos ícones "anterior" e "próximo"
      icon.addEventListener("click", () => {
        // Se o ícone clicado for o ícone "anterior", decrementa o mês atual em 1; caso contrário, incrementa em 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
          // Se o mês atual for menor que 0 ou maior que 11, atualiza a data para o novo mês e ano
          date = new Date(currYear, currMonth, new Date().getDate());
          currYear = date.getFullYear();
          currMonth = date.getMonth();
        } else {
          date = new Date(); // Passa a data atual como valor da data
        }
        renderCalendar(); // Chama a função renderCalendar para atualizar o calendário
      });
    });

    // LEITURAS DE CONSUMO DE ENERGIA
    const daysList = document.querySelector(".days");
    const contentReadings = document.querySelector(
      ".wrapper-readings__content"
    );
    const contentTotal = document.querySelector(".wrapper-readings__total");

    const contentListTotal = document.createElement("ul");
    let contentReadingsChilds = contentReadings.childNodes;
    let contentTotalChilds = contentTotal.childNodes;
    console.log(daysList);
    daysList.addEventListener("click", (event) => {
      const clickedElement = event.target;
      console.log(clickedElement);
      if (clickedElement.tagName === "LI") {
        document
          .querySelectorAll(".days li")
          .forEach((dia) => dia.classList.remove("selected"));
        clickedElement.classList.add("selected");
        const clickedDay = parseInt(clickedElement.textContent);
        const clickedDate = new Date(currYear, currMonth, clickedDay);
        console.log(clickedDate);
        const leiturasRef = firebase
          .database()
          .ref(`Usuario/${userID}/leituras`);

        leiturasRef.on("value", (snapshot) => {
          const leituras = snapshot.val();

          if (leituras) {

            for (var i = contentReadingsChilds.length - 1; i >= 0; i--) {
              contentReadings.removeChild(contentReadingsChilds[i]);
            }
            for (var i = contentTotalChilds.length - 1; i >= 0; i--) {
              contentTotal.removeChild(contentTotalChilds[i]);
            }

            let listReadings = document.createElement("ul");

            for (const leiturasID in leituras) {

              const leitura = leituras[leiturasID];

              if (leiturasID === formatDate(clickedDate)) {
                for (var i = contentReadingsChilds.length - 1; i >= 0; i--) {
                  contentReadings.removeChild(contentReadingsChilds[i]);
                }
                for (var i = contentTotalChilds.length - 1; i >= 0; i--) {
                  contentTotal.removeChild(contentTotalChilds[i]);
                }
               
                let itemReading = document.createElement("li");

                const amperesValue =
                  leitura.Ampere !== "" ? parseFloat(leitura.Ampere) : 0;
                const voltsValue =
                  leitura.Volts !== "" ? parseFloat(leitura.Volts) : 0;
                const wattsValue =
                  leitura.Watts !== "" ? parseFloat(leitura.Watts) : 0;

                const amperesText =
                  leitura.Amperes !== ""
                    ? `${leitura.Ampere} A`
                    : "Não informado";
                const voltsText =
                  leitura.Volts !== "" ? `${leitura.Volts} V` : "Não informado";
                const wattsText =
                  leitura.Watts !== "" ? `${leitura.Watts} W` : "Não informado";

                itemReading.innerHTML = `<h3>Leitura</h3>
                  <span>Amperes: ${amperesText} </span>
                  <span>Volts: ${voltsText} </span>
                  <span>Watts: ${wattsText} </span>
                  `;
                listReadings.appendChild(itemReading);
                contentReadings.appendChild(listReadings);
               
                contentListTotal.innerHTML = `<li>Amperes:  ${totalAmperes} </li><li>Volts:  ${totalVolts} </li><li>Watts:  ${totalWatts} </li>`;
                contentTotal.appendChild(contentListTotal);
                console.log("Leituras do dia:", leituras);
              }else {
                for (var i = contentReadingsChilds.length - 1; i >= 0; i--) {
                  contentReadings.removeChild(contentReadingsChilds[i]);
                }
                for (var i = contentTotalChilds.length - 1; i >= 0; i--) {
                  contentTotal.removeChild(contentTotalChilds[i]);
                }
                let message_errror = document.createElement("span");
                message_errror.classList.add("message-error");
                message_errror.textContent =
                  "Nenhuma leitura para o dia selecionado.";
                contentReadings.appendChild(message_errror);
                console.log("Não há nenhuma leitura registrada!");
              }
             
            }
          } else {
            for (var i = contentReadingsChilds.length - 1; i >= 0; i--) {
              contentReadings.removeChild(contentReadingsChilds[i]);
            }
            for (var i = contentTotalChilds.length - 1; i >= 0; i--) {
              contentTotal.removeChild(contentTotalChilds[i]);
            }
            let message_errror = document.createElement("span");
            message_errror.classList.add("message-error");
            message_errror.textContent =
              "Nenhuma leitura para o dia selecionado.";
            contentReadings.appendChild(message_errror);
            console.log("Não há nenhuma leitura registrada!");
          }
        });
      }
    });
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
