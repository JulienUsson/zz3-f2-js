/**
 * Rend exécutables, sur les fiches de TP, les blocs que les slides exécutent
 * déjà — ceux marqués `{monaco-run}` dans les exercices.
 *
 * L'exécution elle-même vit dans `runner.ts`, partagée avec le playground.
 */
import { formater } from "./outils-code";
import { executer, type Execution } from "./runner";

function setup(pre: HTMLElement) {
  const code = pre.querySelector("code");
  if (!code) return;

  const source = code.textContent ?? "";
  let current = source;
  let execution: Execution | undefined;

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

  const format = document.createElement("button");
  format.type = "button";
  format.textContent = "⌨ Formater";

  const reset = document.createElement("button");
  reset.type = "button";
  reset.textContent = "↺ Réinitialiser";
  reset.hidden = true;

  const output = document.createElement("div");
  output.className = "runnable-output";
  output.hidden = true;

  toolbar.append(run, edit, format, reset);
  container.append(editor, toolbar, output);

  function print(text: string, level = "log") {
    output.hidden = false;
    const line = document.createElement("div");
    line.className = `runnable-line is-${level}`;
    line.textContent = text;
    output.append(line);
  }

  function fin() {
    execution = undefined;
    run.textContent = "▶ Exécuter";
  }

  run.addEventListener("click", () => {
    if (execution) {
      execution.arreter();
      print("Arrêté.", "warn");
      return;
    }

    output.replaceChildren();
    output.hidden = false;
    run.textContent = "⏹ Arrêter";
    execution = executer(current, ({ texte, niveau }) => print(texte, niveau), fin);
  });

  /** Met le code en forme, qu'on soit en train de l'éditer ou de le lire. */
  format.addEventListener("click", async () => {
    format.disabled = true;
    try {
      current = await formater(current, "javascript");
      editor.value = current;
      code.textContent = current;
      reset.hidden = current === source;
    } catch (erreur) {
      output.replaceChildren();
      print(String(erreur), "error");
    } finally {
      format.disabled = false;
    }
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
