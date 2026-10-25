/**
 * Mise en forme et transpilation, chargées à la demande.
 *
 * Prettier et le compilateur TypeScript pèsent lourd (plusieurs mégaoctets) :
 * un `import()` dynamique les met dans un morceau séparé, que le navigateur ne
 * télécharge que si l'élève clique sur « Formater » ou choisit TypeScript.
 */

export type Langage = "javascript" | "typescript";

/** Met le code en forme. Lève si le code ne parse pas. */
export async function formater(code: string, langage: Langage): Promise<string> {
  const [prettier, babel, estree, typescript] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/plugins/babel"),
    import("prettier/plugins/estree"),
    import("prettier/plugins/typescript"),
  ]);

  return prettier.format(code, {
    parser: langage === "typescript" ? "typescript" : "babel",
    plugins: [babel.default ?? babel, estree.default ?? estree, typescript.default ?? typescript],
  });
}

/**
 * Retire les types pour obtenir du Javascript exécutable.
 *
 * On passe par le vrai compilateur TypeScript, celui qu'utilisent déjà les
 * blocs exécutables des slides : le résultat est le même des deux côtés.
 */
export async function versJavascript(code: string, langage: Langage): Promise<string> {
  if (langage !== "typescript") return code;
  const ts = await import("typescript");
  return ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
}
