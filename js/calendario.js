const daysTag = document.querySelector(".days"), // Seleciona o elemento HTML com a classe "days"
      currentDate = document.querySelector(".current-date"), // Seleciona o elemento HTML com a classe "current-date"
      prevNextIcon = document.querySelectorAll(".icons span"); // Seleciona todos os elementos HTML com a classe "icons" e a tag "span"

// Obtendo a nova data, o ano atual e o mês atual
let date = new Date(), // Cria um objeto Date para a data atual
    currYear = date.getFullYear(), // Obtém o ano atual
    currMonth = date.getMonth(); // Obtém o mês atual

// Armazenando o nome completo de todos os meses em um array
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
              "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const renderCalendar = () => {
    // Obtendo o primeiro dia do mês
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    // Obtendo o último dia do mês
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    // Obtendo o último dia do mês
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    // Obtendo o último dia do mês anterior
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        // Criando elementos <li> para os últimos dias do mês anterior
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        // Criando elementos <li> para todos os dias do mês atual
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        // Criando elementos <li> para os primeiros dias do próximo mês
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}

renderCalendar(); // Chamando a função renderCalendar para renderizar o calendário

prevNextIcon.forEach(icon => {
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
