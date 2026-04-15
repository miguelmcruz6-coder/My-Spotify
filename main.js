import {
  salvarUsuario,
  bancoDadosUsuarios,
  salvarMusica,
  escutarMusicas,
} from "./crud.js";

const home = document.getElementById("home");
const cadastrarbtn = document.getElementById("cadastrarBtn");
const logarbtn = document.getElementById("logarBtn");
const adicionarMusicaBtn = document.getElementById("adicionarMusicaBtn");

const cadastrarLink = document.getElementById("cadastrarLink");
const logarLink = document.getElementById("logarLink");
const irParaMusicas = document.getElementById("irParaMusicas");
const listaArtista = document.getElementById("listaArtista");

const cadastroSection = document.getElementById("cadastro");
const loginSection = document.getElementById("login");
const musicasSection = document.getElementById("musicasSection");

const confirmarCadastro = document.getElementById("confirmarCadastro");
const confirmarLogin = document.getElementById("confirmarLogin");

const musicaAdicionarAba = document.getElementById("adicionarMusica");
const musicasList = document.getElementById("musicasList");
const adicionarMusica = document.getElementById("adicionarMusicaForm");

let logado = false;

cadastrarbtn.addEventListener("click", () => {
  home.style.display = "none";
  cadastroSection.style.display = "block";
  loginSection.style.display = "none";
  musicasSection.style.display = "none";
});

logarbtn.addEventListener("click", () => {
  home.style.display = "none";
  cadastroSection.style.display = "none";
  loginSection.style.display = "block";
  musicasSection.style.display = "none";
});

cadastrarLink.addEventListener("click", (e) => {
  e.preventDefault();

  home.style.display = "none";
  cadastroSection.style.display = "block";
  loginSection.style.display = "none";
  musicasSection.style.display = "none";
});

logarLink.addEventListener("click", (e) => {
  e.preventDefault();

  home.style.display = "none";
  cadastroSection.style.display = "none";
  loginSection.style.display = "block";
  musicasSection.style.display = "none";
});

adicionarMusicaBtn.addEventListener("click", () => {
  home.style.display = "none";
  cadastroSection.style.display = "none";
  loginSection.style.display = "none";
  musicasSection.style.display = "none";
  musicaAdicionarAba.style.display = "block";
  adicionarMusica.style, (display = "block");
});

confirmarCadastro.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = document.getElementById("cEmail").value;
  const senha = document.getElementById("cPassword").value;
  const sucesso = await salvarUsuario(email, senha);
  if (sucesso) {
    alert("Usuário cadastrado com sucesso!");
  } else {
    alert("Erro ao cadastrar usuário.");
  }
});

confirmarLogin.addEventListener("click", loguin);

async function loguin(event) {
  event.preventDefault();
  const email = document.getElementById("lEmail").value;
  const senha = document.getElementById("lPassword").value;
  const data = (await bancoDadosUsuarios()) || {};
  let encontrou = false;

  for (const key in data) {
    if (data[key].usuario === email && data[key].senha === senha) {
      encontrou = true;
      break;
    }
  }

  if (encontrou) {
    alert("Usuário logado com sucesso!");
    inicio();
    logado = true;
  } else {
    alert("Erro ao logar usuário.");
  }
}

adicionarMusica.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nomeMusica = document.getElementById("nomeMusica").value;
  const urlMusica = document.getElementById("urlMusica").value;
  const urlLocalMusica = document.getElementById("urlLocalMusica").value;
  const urlImagem = document.getElementById("urlImagem").value;

  const sucesso = await salvarMusica(
    nomeMusica,
    urlMusica,
    urlLocalMusica,
    urlImagem
  );
  if (sucesso) {
    alert("Música adicionada com sucesso!");
    home.style.display = "none";
    cadastroSection.style.display = "none";
    loginSection.style.display = "none";
    musicasSection.style.display = "block";
    adicionarMusica.style.display = "none";
  } else {
    alert("Erro ao adicionar música.");
  }
});

function renderizarMusicas(data) {
  musicasList.innerHTML = ""; // limpa antes de atualizar

  if (!data) return;

  for (const key in data) {
    const musica = data[key];

    musicasList.innerHTML += `
        <li>
            <div>
            <strong>${musica.nome}</strong><br>
            <img src="${musica.imagem}" width="200">
            </div>
            <div>
            <audio controls>
                <source src="${musica.musica}" type="audio/mpeg">
            </audio>
            <a href="${musica.url}" target="_blank">Ouvir em outra aba</a>
            </div>
        </li>
        `;
  }
}

irParaMusicas.addEventListener("click", () => {
  if (logado) {
    inicio();
  } else {
    alert("Faça Login Primeiro");
  }
});
listaArtista.addEventListener("click", () => {
  alert("Ainda em desenvolvimento...");
});

function inicio() {
  home.style.display = "none";
  cadastroSection.style.display = "none";
  loginSection.style.display = "none";
  musicasSection.style.display = "block";
  musicaAdicionarAba.style.display = "none";
  escutarMusicas(renderizarMusicas);
}
