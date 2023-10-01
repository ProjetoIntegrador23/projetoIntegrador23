import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBOlATv13ZOA_pmmCwfh-iH2EvuI7-PDuM",
  authDomain: "meuconsumodeenergiaweb.firebaseapp.com",
  databaseURL: "https://meuconsumodeenergiaweb-default-rtdb.firebaseio.com",
  projectId: "meuconsumodeenergiaweb",
  storageBucket: "meuconsumodeenergiaweb.appspot.com",
  messagingSenderId: "376629492849",
  appId: "1:376629492849:web:984c2d29d8427a42d6afd0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { hash } from "bcrypt";

// Constantes
const buttonNext = document.querySelector(".buttonNext button");
const contentConnection = document.querySelector(".contentConnection");
const contentInfomation = document.querySelector(".contentInfomation");
const buttonPrevious = document.querySelector(".buttonPrevious");

const nomeUsuario = document.querySelector(".nameUser");
const emailUsuario = document.querySelector(".emailUser");
const enderecoUsuario = document.querySelector(".addressUser");
const bairroUsuario = document.querySelector(".districtUser");
const numPessoasUsuario = document.querySelector(".passwordUser");
const senhaUsuario = document.querySelector(".passwordUser");
const cidadeUsuario = document.querySelector(".cityUser");
const horaEquipamento = document.querySelector(".hoursUser");
const consumoUsuario = document.querySelector(".consumptionUser");
const nomeRede = document.querySelector(".netUser");
const senhaRede = document.querySelector(".netPasswordUser");
const enderecoMac = document.querySelector(".adreessMacModulo");

const buttonRegister = document.querySelector(".buttonRegister");

// Event of click
buttonNext.addEventListener("click", function () {
  contentConnection.style.display = "flex";
  contentInfomation.style.display = "none";
});
buttonPrevious.addEventListener("click", function () {
  contentConnection.style.display = "none";
  contentInfomation.style.display = "flex";
});

// Classe para representar um usuário
class Usuario {
  constructor(
    nome,
    email,
    senha,
    endereco,
    bairro,
    cidade,
    metaConsumo,
    horasConsumo,
    pessoasResidencia,
    nomeRedeWifi,
    senhaRedeWifi,
    enderecoMacESP
  ) {
    this.nome = nome;
    this.email = email;
    this.senha = senha; 
    this.endereco = endereco;
    this.bairro = bairro;
    this.cidade = cidade;
    this.metaConsumo = metaConsumo;
    this.horasConsumo = horasConsumo;
    this.pessoasResidencia = pessoasResidencia;
    this.nomeRedeWifi = nomeRedeWifi;
    this.senhaRedeWifi = senhaRedeWifi;
    this.enderecoMacESP = enderecoMacESP;
  }

  // Método para cadastrar um novo usuário
  async cadastrar() {
    try {
      const nome = nomeUsuario.value;
      const email = emailUsuario.value;
      const senha = senhaUsuario.value;
      const endereco = enderecoUsuario.value;
      const bairro = bairroUsuario.value;
      const cidade = cidadeUsuario.value;
      const numPessoas = numPessoasUsuario.value;
      const horas = horaEquipamento.value;
      const consumo = consumoUsuario.value;
      const redeNome = nomeRede.value;
      const redeSenha = senhaRede.value;
      const Macenredeco = enderecoMac.value;

      // Criptografar a senha usando bcrypt
      const hashSenha = await bcrypt.hash(senha, 10);

      // Cadastre o usuário no Firebase Authentication
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        hashSenha
      );
      const userId = userCredential.user.uid;

      // Cadastre os dados do usuário no Realtime Database
      await firebase
        .database()
        .ref("usuarios/" + userId)
        .set({
          nome: this.nome,
          email: this.email,
          senha: hashSenha,
          endereco: this.endereco,
          bairro: this.bairro,
          cidade: this.cidade,
          metaConsumo: this.metaConsumo,
          horasConsumo: this.horasConsumo,
          pessoasResidencia: this.pessoasResidencia,
          nomeRedeWifi: this.nomeRedeWifi,
          senhaRedeWifi: this.senhaRedeWifi,
          enderecoMacESP: this.enderecoMacESP,
          // Outros dados do usuário
        });

      console.log("Usuário cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  }

  // Método para autenticar um usuário

  async autenticar() {
    try {
      // Autentique o usuário no Firebase Authentication
      await firebase.auth().signInWithEmailAndPassword(this.email, hashSenha);

      console.log("Usuário autenticado com sucesso!");
    } catch (error) {
      console.error("Erro ao autenticar usuário:", error);
    }
  }

 
}

// Classe para representar o consumo de energia
// class ConsumoEnergia {
//   constructor(usuario, data, consumo) {
//     this.usuario = usuario;
//     this.data = data;
//     this.consumo = consumo;
//   }

//   // Métodos para calcular consumo, exibir histórico
// }

// Classe para representar a estimativa de custo
// class EstimativaCusto {
//   constructor(usuario, consumo) {
//     this.usuario = usuario;
//     this.consumo = consumo;
//   }

// Métodos para calcular custo estimado, exibir informações
// }

// Classe para representar o site e suas funcionalidades
// class Site {
//   constructor() {
//     // Inicializa o site, configura eventos, etc.
//   }

//   // Métodos para interagir com a interface do usuário, exibir informações
// }

// Classe para representar o circuito de medidor de consumo
// class CircuitoMedidor {
//   constructor() {
//     // Inicializa o circuito, configurações de hardware, comunicação
//   }

//   // Métodos para ler sensores, calcular consumo, enviar dados, etc.
// }

// Exemplo de uso das classes
const novoRegistro = new Usuario(
  nomeUsuario,
  emailUsuario,
  senhaUsuario,
  enderecoUsuario,
  bairroUsuario,
  cidadeUsuario,
  consumoUsuario,
  horaEquipamento,
  numPessoasUsuario,
  nomeRede,
  senhaRede,
  enderecoMac
);
// const site = new Site();
// const circuito = new CircuitoMedidor();

// Interagindo com as classes para realizar ações no sistema
novoRegistro.cadastrar();
novoRegistro.autenticar();
// site.exibirInformacoesUsuario(novoRegistro);
// circuito.calcularConsumo();
