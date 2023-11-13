if (localStorage.getItem("userLoggedIn") === "true") {
  const userDataString = localStorage.getItem("userData");
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    const userID = userData.userId;
    const userRef = firebase.database().ref("Usuario/" + userID);

    // ALTERAR DADOS

    // ADICIONAR META DE CONSUMO

    // EXCLUIR CONTA
    const buttonDelete = document.querySelector(".btn-delete");
    buttonDelete.addEventListener("click", function (e) {
      e.preventDefault();
      const confirmDelete = confirm(
        "Tem certeza de que deseja excluir sua conta? Esta ação é irreversível."
      );
      if (confirmDelete) {
        userRef
          .remove()
          .then(() => {
            alert("Sua conta foi excluída com sucesso.");
            localStorage.removeItem("userLoggedIn");
            localStorage.removeItem("userData");
            setTimeout(function () {
              window.location.href = "../index.html";
            }, 500);
          })
          .catch((error) => {
            console.error("Erro ao excluir conta:", error.message);
          });
      }
    });
  } else {
    alert("Dados do usuário não encontrado!");
  }
}
