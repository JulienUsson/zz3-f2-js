/**
 * Rend exécutables, sur les fiches de TP, les blocs que les slides exécutent
 * déjà — ceux marqués `{monaco-run}` dans les exercices.
 *
 * Le code tourne dans un Web Worker, pour deux raisons :
 *   - une boucle infinie ne fige pas l'onglet, on peut tuer le worker ;
 *   - le code de l'élève n'a pas accès au DOM de la page.
 */

/** Au-delà, on considère que le code ne s'arrêtera pas tout seul. */
const TIMEOUT_MS = 10_000;

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

function createWorker(): Worker {
  const blob = new Blob([WORKER_SOURCE], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);
  URL.revokeObjectURL(url);
  return worker;
}

function setup(pre: HTMLElement) {
  const code = pre.querySelector("code");
  if (!code) return;

  const source = code.textContent ?? "";
  let current = source;
  let worker: Worker | undefined;
  let timer: number | undefined;

  const container = document.createElement("div");
  container.className = "runnable";
  pre.parentNode?.insertBefore(container, pre);
  container.append(pre);

  const editor = document.createElement("textarea");
  editor.className = "runnable-editor";
  editor.hidden = true;
  editor.spellcheck = false;
  editor.value = source;
  editor.addEventListener("input", () => {
    current = editor.value;
    reset.hidden = current === source;
  });

  const toolbar = document.createElement("div");
  toolbar.className = "runnable-toolbar";

  const run = document.createElement("button");
  run.type = "button";
  run.className = "runnable-run";
  run.textContent = "▶ Exécuter";

  const edit = document.createElement("button");
  edit.type = "button";
  edit.textContent = "✏️ Modifier";

  const reset = document.createElement("button");
  reset.type = "button";
  reset.textContent = "↺ Réinitialiser";
  reset.hidden = true;

  const output = document.createElement("div");
  output.className = "runnable-output";
  output.hidden = true;

  toolbar.append(run, edit, reset);
  container.append(editor, toolbar, output);

  function print(text: string, level = "log") {
    output.hidden = false;
    const line = document.createElement("div");
    line.className = `runnable-line is-${level}`;
    line.textContent = text;
    output.append(line);
  }

  function stop() {
    worker?.terminate();
    worker = undefined;
    if (timer) clearTimeout(timer);
    run.textContent = "▶ Exécuter";
  }

  run.addEventListener("click", () => {
    if (worker) {
      stop();
      print("Arrêté.", "warn");
      return;
    }

    output.replaceChildren();
    output.hidden = false;
    run.textContent = "⏹ Arrêter";

    worker = createWorker();
    worker.onmessage = ({ data }) => {
      if (data.type === "log") print(data.text, data.level);
      else if (data.type === "error") print(data.text, "error");
      else stop();
    };
    worker.postMessage(current);

    timer = window.setTimeout(() => {
      stop();
      print(
        `Arrêté après ${TIMEOUT_MS / 1000} s — une boucle qui ne se termine pas ?`,
        "error",
      );
    }, TIMEOUT_MS);
  });

  edit.addEventListener("click", () => {
    const startEditing = editor.hidden;

    if (startEditing) {
      // Mesuré avant de masquer le bloc : caché, sa hauteur vaut zéro.
      editor.style.height = `${Math.max(pre.offsetHeight, 120)}px`;
      editor.hidden = false;
      pre.hidden = true;
      edit.textContent = "👁 Voir coloré";
      editor.focus();
      return;
    }

    // Retour à la vue colorée. Si le code a changé, la coloration d'origine ne
    // correspond plus : on affiche le texte modifié tel quel plutôt qu'un
    // ancien code joliment coloré.
    if (current !== source) code.textContent = current;
    editor.hidden = true;
    pre.hidden = false;
    edit.textContent = "✏️ Modifier";
  });

  reset.addEventListener("click", () => {
    current = source;
    editor.value = source;
    code.textContent = source;
    reset.hidden = true;
    output.replaceChildren();
    output.hidden = true;
  });
}

document.querySelectorAll<HTMLElement>("pre[data-runnable]").forEach(setup);
