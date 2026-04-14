
import {salvarUsuario, bancoDados, salvarMusica} from "./crud.js";

const home = document.getElementById("home");
const cadastrarbtn = document.getElementById("cadastrarBtn");
const logarbtn = document.getElementById("logarBtn");
const adicionarMusicaBtn = document.getElementById("adicionarMusicaBtn");

const cadastrarLink = document.getElementById("cadastrarLink");
const logarLink = document.getElementById("logarLink");

const cadastroSection = document.getElementById("cadastro");
const loginSection = document.getElementById("login");

const confirmarCadastro = document.getElementById("confirmarCadastro");
const confirmarLogin = document.getElementById("confirmarLogin");

const musicasSection = document.getElementById("musicasSection");
const musicasList = document.getElementById("musicasList");
const adicionarMusicaForm = document.getElementById("adicionarMusicaForm");


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
    document.getElementById("adicionarMusica").style.display = "block";
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

confirmarLogin.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById("lEmail").value;
    const senha = document.getElementById("lPassword").value;
    const data = await bancoDados() || {};
    let encontrou = false;

    for (const key in data) {
        if (data[key].usuario === email && data[key].senha === senha) {
            encontrou = true;
            break;
        }
    }

    if (encontrou) {
        alert("Usuário logado com sucesso!");
        home.style.display = "none";
        cadastroSection.style.display = "none";
        loginSection.style.display = "none";
        musicasSection.style.display = "block";
    } else {
        alert("Erro ao logar usuário.");
    }
});

adicionarMusicaForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nomeMusica = document.getElementById("nomeMusica").value;
    const urlMusica = document.getElementById("urlMusica").value;
    const urlImagem = document.getElementById("urlImagem").value;

    const sucesso = await salvarMusica(nomeMusica, urlMusica, urlImagem);
    if (sucesso) {
        alert("Música adicionada com sucesso!");
        home.style.display = "none";
        cadastroSection.style.display = "none";
        loginSection.style.display = "none";
        musicasSection.style.display = "block";
        adicionarMusicaForm.style.display = "none";
        musicasList.innerHTML += `
        <li>
            <strong>${nomeMusica}</strong><br>
            <audio controls>
                <source src="${urlMusica}" type="audio/mpeg">
            </audio>
            <a href="${urlMusica}" target="_blank">Ouvir em outra aba</a>
        </li>
        `;
    } else {
        alert("Erro ao adicionar música.");
    }
});