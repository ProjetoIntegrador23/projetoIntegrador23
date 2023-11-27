if (localStorage.getItem("userLoggedIn") === "true") {
  const userDataString = localStorage.getItem("userData");
  if (userDataString) {
    const userData = JSON.parse(userDataString);

    const userID = userData.userId;
    const userRef = firebase.database().ref("Usuario/" + userID);

    // RESGATAR TODOS OS DADOS
    const formAlter = document.querySelector("#formAlter");
    const formMeta = document.querySelector("#formMeta");
    const inputName = document.querySelector("#nameUserAlter");
    const inputEmail = document.querySelector("#emailUserAlter");
    const inputSenha = document.querySelector("#passwordUserAlter");
    const nameRede = document.querySelector("#nameRedeWifi");
    const senhaRede = document.querySelector("#passwordRedeWifi");
    const enderecoMac = document.querySelector("#enderecoMacWifi");
    const valorMeta = document.querySelector("#valueMeta");
    const tipoMeta = document.querySelector("#typeMeta");
    const deleteMeta = document.querySelector(".delete-meta");

    function encryptPassword(password, secretKey) {
      return CryptoJS.AES.encrypt(password, secretKey).toString();
    }

    function decryptPassword(encryptedPassword, secretKey) {
      const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
      return originalPassword;
    }

    userRef
      .once("value")
      .then((snapshot) => {
        const user = snapshot.val();
        inputName.value = user.name;
        inputEmail.value = user.email;
        const senhaDescriptografada = decryptPassword(
          user.senha,
          "pR0Jet01nt&gr@d0R02!"
        );
        inputSenha.value = senhaDescriptografada;
      })
      .catch((error) => {
        console.log(
          "Não foi possível resgatar informações de senha do usuário!"
        );
      });

    const wifiRef = firebase.database().ref("Usuario/" + userID + "/redeWifi");
    wifiRef
      .once("value")
      .then((snapshot) => {
        const wifi = snapshot.val();
        nameRede.value = wifi.rede;
        const senhaRedeDescriptografada = decryptPassword(
          wifi.senhaRede,
          "pR0Jet01nt&gr@d0R02!"
        );
        senhaRede.value = senhaRedeDescriptografada;
      })
      .catch((error) => {
        console.log(
          "Não foi possível resgatar informações do nome da rede e ou senha da rede do usuário!"
        );
      });
    const moduloWifiRef = firebase
      .database()
      .ref("Usuario/" + userID + "/moduloWifi");
    moduloWifiRef
      .once("value")
      .then((snapshot) => {
        const modulo = snapshot.val();
        enderecoMac.value = modulo.modulo;
      })
      .catch((error) => {
        enderecoMac.value = "Não definido";
      });

    // ALTERAR DADOS
    formAlter.addEventListener("submit", function (event) {
      event.preventDefault();
      const encryptedPassword = encryptPassword(
        inputSenha.value,
        "pR0Jet01nt&gr@d0R02!"
      );
      const encryptedPasswordRede = encryptPassword(
        senhaRede.value,
        "pR0Jet01nt&gr@d0R02!"
      );
      userRef
        .update({
          userId: userID,
          name: inputName.value,
          email: inputEmail.value,
          senha: encryptedPassword,
          redeWifi: {
            rede: nameRede.value,
            senhaRede: encryptedPasswordRede,
          },
          moduloWifi: {
            modulo: enderecoMac.value,
          },
        })
        .then(() => {
          alert("Dados atualizados com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao atualizar dados:", error);
        });
    });

    // ADICIONAR META DE CONSUMO
    const metaRef = firebase
      .database()
      .ref("Usuario/" + userID + "/metaConsumo");
    metaRef
      .once("value")
      .then((snapshot) => {
        const meta = snapshot.val();
        if (meta) {
          valorMeta.value = meta.meta;
          tipoMeta.value = meta.tipoMeta;
          formMeta.addEventListener("submit", function (event) {
            event.preventDefault();
            metaRef
              .update({
                meta: valorMeta.value,
                tipoMeta: tipoMeta.value,
              })
              .then(() => {
                alert("Meta adicionada com sucesso!");
              })
              .catch((error) => {
                console.error("Erro ao atualizar dados:", error);
              });
          });
        } else {
          formMeta.addEventListener("submit", function (event) {
            metaRef
              .set({
                meta: valorMeta.value,
                tipoMeta: tipoMeta.value,
              })
              .then(() => {
                alert("Meta adicionada com sucesso!");
              })
              .catch((error) => {
                console.error("Erro ao atualizar dados:", error);
              });
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao acessar o banco de dados:", error);
      });

    // DELETAR META DE CONSUMO
    deleteMeta.addEventListener("click", function (e) {
      e.preventDefault();
      const confirmDeleteMeta = confirm(
        "Tem certeza de que deseja excluir sua meta?"
      );
      if (confirmDeleteMeta) {
        metaRef
          .remove()
          .then(() => {
            alert("Sua meta foi deletada com sucesso!");
            setTimeout(function () {
              window.location.href = "../perfil.html";
            }, 500);
          })
          .catch((error) => {
            console.error("Erro ao excluir meta:", error.message);
          });
      }
    });

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
} else {
  alert("Usuário não logado!");
  setTimeout(function () {
    window.location.href = "../index.html";
  }, 500);
}
