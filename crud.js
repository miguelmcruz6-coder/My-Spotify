import { db } from "./firebaseConfig.js";
import {
  ref,
  set,
  push,
  onValue,
  get,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const usuarioRef = ref(db, "usuarios/");
const musicaRef = ref(db, "musicas/");

export async function salvarUsuario(usuario, senha) {
  const novoRef = push(usuarioRef);
  try {
    await set(novoRef, {
      usuario: usuario,
      senha: senha,
    });
    return true;
  } catch (error) {
    console.error("Erro ao salvar usuário:", error);
    return false;
  }
}

export function bancoDadosUsuarios() {
  return new Promise((resolve) => {
    onValue(
      usuarioRef,
      (snapshot) => {
        resolve(snapshot.val());
      },
      { onlyOnce: true }
    );
  });
}

export async function salvarMusica(nomeMusica, urlMusica, urlImagem) {
  try {
    const snapshot = await get(musicaRef);
    if (snapshot.exists()) {
      const musicas = snapshot.val();

      const musicaExiste = Object.values(musicas).some(
        (m) => m.url === urlMusica
      );
      if (musicaExiste) {
        console.log("Música já existe!");
        return false;
      }
    }
    const novaMusica = push(musicaRef);

    await set(novaMusica, {
      nome: nomeMusica,
      url: urlMusica,
      imagem: urlImagem,
    });
    return true;
  } catch (error) {
    console.error("Erro:", error);
    return false;
  }
}

export function escutarMusicas(callback) {
  onValue(musicaRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}
