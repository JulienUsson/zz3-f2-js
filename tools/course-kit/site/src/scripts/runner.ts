/**
 * Exécute du code élève dans un Web Worker.
 *
 * Deux raisons au worker plutôt qu'un `eval` sur la page :
 *   - une boucle infinie ne fige pas l'onglet, on peut tuer le worker ;
 *   - le code n'a pas accès au DOM de la page.
 */

/** Au-delà, on considère que le code ne s'arrêtera pas tout seul. */
export const TIMEOUT_MS = 10_000;

const WORKER_SOURCE = `
const format = (value) => {
  if (typeof value === "string") return value;
  if (value instanceof Error) return value.stack || String(value);
  try { return JSON.stringify(value); } catch { return String(value); }
};

for (const level of ["log", "info", "warn", "error"]) {
  console[level] = (...args) =>
    self.postMessage({ type: "log", level, text: args.map(format).join(" ") });
}

self.onmessage = async ({ data }) => {
  try {
    // Enveloppé dans une fonction async : les exercices utilisent await.
    await new Function("return (async () => {\\n" + data + "\\n})()")();
    self.postMessage({ type: "done" });
  } catch (error) {
    self.postMessage({ type: "error", text: format(error) });
  }
};
`;

export type Sortie = { texte: string; niveau: string };

export type Execution = {
  /** Interrompt le code en cours. Sans effet s'il est déjà terminé. */
  arreter: () => void;
};

/**
 * Lance `code` et appelle `onSortie` à chaque ligne produite, puis `onFin`
 * quand c'est terminé — normalement, sur erreur, ou par expiration du délai.
 */
export function executer(
  code: string,
  onSortie: (sortie: Sortie) => void,
  onFin: () => void,
): Execution {
  const blob = new Blob([WORKER_SOURCE], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);
  URL.revokeObjectURL(url);

  let minuteur: number | undefined;
  let termine = false;

  function arreter() {
    if (termine) return;
    termine = true;
    worker.terminate();
    if (minuteur) clearTimeout(minuteur);
    onFin();
  }

  worker.onmessage = ({ data }) => {
    if (data.type === "log") onSortie({ texte: data.text, niveau: data.level });
    else if (data.type === "error") onSortie({ texte: data.text, niveau: "error" });
    else arreter();
  };

  worker.postMessage(code);

  minuteur = window.setTimeout(() => {
    onSortie({
      texte: `Arrêté après ${TIMEOUT_MS / 1000} s — une boucle qui ne se termine pas ?`,
      niveau: "error",
    });
    arreter();
  }, TIMEOUT_MS);

  return { arreter };
}
