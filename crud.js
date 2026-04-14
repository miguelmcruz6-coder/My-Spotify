
import { db } from "./firebaseConfig.js";
import { ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const usuarioRef = ref(db, 'usuarios/');
const musicaRef = ref(db, 'musicas/');

export async function salvarUsuario(usuario, senha) {
    const novoRef = push(usuarioRef);
    try {
        await set(novoRef, {
            usuario: usuario,
            senha: senha
        });
        return true;
    } catch (error) {
        console.error("Erro ao salvar usuário:", error);
        return false;
    }
}


export function bancoDados() {
    return new Promise((resolve) => {
        onValue(usuarioRef, (snapshot) => {
            resolve(snapshot.val());
        }, { onlyOnce: true });
    });
}

export async function salvarMusica(nomeMusica, urlMusica, urlImagem) {
    const novaMusica = push(musicaRef);

    try {
        await set(novaMusica, {
            nome: nomeMusica,
            url: urlMusica,
            imagem: urlImagem
        });

        return true;
    } catch (error) {
        console.error("Erro ao salvar música:", error);
        return false;
    }

}