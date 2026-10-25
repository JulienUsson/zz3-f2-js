import { formater, versJavascript, type Langage } from "./outils-code";
import { executer, type Execution } from "./runner";

const editeur = document.querySelector<HTMLTextAreaElement>("#pg-code")!;
const sortie = document.querySelector<HTMLDivElement>("#pg-sortie")!;
const boutonRun = document.querySelector<HTMLButtonElement>("#pg-run")!;
const boutonFormat = document.querySelector<HTMLButtonElement>("#pg-format")!;
const boutonVider = document.querySelector<HTMLButtonElement>("#pg-vider")!;
const choixLangage = document.querySelector<HTMLSelectElement>("#pg-langage")!;

/** Le code survit au rechargement : on perd rarement un brouillon par accident. */
const CLE = "playground";

let enCours: Execution | undefined;

const langage = () => choixLangage.value as Langage;

function ecrire(texte: string, niveau = "log") {
  sortie.hidden = false;
  const ligne = document.createElement("div");
  ligne.className = `runnable-line is-${niveau}`;
  ligne.textContent = texte;
  sortie.append(ligne);
}

function fin() {
  enCours = undefined;
  boutonRun.textContent = "▶ Exécuter";
}

boutonRun.addEventListener("click", async () => {
  if (enCours) {
    enCours.arreter();
    ecrire("Arrêté.", "warn");
    return;
  }

  sortie.replaceChildren();
  sortie.hidden = false;
  boutonRun.textContent = "⏹ Arrêter";

  let code: string;
  try {
    code = await versJavascript(editeur.value, langage());
  } catch (erreur) {
    ecrire(String(erreur), "error");
    fin();
    return;
  }

  enCours = executer(code, ({ texte, niveau }) => ecrire(texte, niveau), fin);
});

boutonFormat.addEventListener("click", async () => {
  boutonFormat.disabled = true;
  try {
    editeur.value = await formater(editeur.value, langage());
    sauver();
  } catch (erreur) {
    // Prettier échoue sur du code qui ne parse pas : c'est une information
    // utile en soi, on l'affiche au lieu de l'avaler — en remplaçant la
    // sortie précédente, qui ne correspond plus à ce code.
    sortie.replaceChildren();
    ecrire(String(erreur), "error");
  } finally {
    boutonFormat.disabled = false;
  }
});

boutonVider.addEventListener("click", () => {
  editeur.value = "";
  sortie.replaceChildren();
  sortie.hidden = true;
  sauver();
  editeur.focus();
});

const sauver = () => {
  try {
    localStorage.setItem(CLE, JSON.stringify({ code: editeur.value, langage: langage() }));
  } catch {
    // Navigation privée, stockage plein : le playground marche sans.
  }
};

editeur.addEventListener("input", sauver);
choixLangage.addEventListener("change", sauver);

try {
  const garde = JSON.parse(localStorage.getItem(CLE) ?? "null");
  if (garde?.code) editeur.value = garde.code;
  if (garde?.langage) choixLangage.value = garde.langage;
} catch {
  // Rien de sauvegardé, ou illisible : on garde l'exemple par défaut.
}

// Ctrl/⌘ + Entrée : lancer sans quitter le clavier.
editeur.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    event.preventDefault();
    boutonRun.click();
  }
});
