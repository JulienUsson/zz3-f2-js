import { defineMonacoSetup } from "@slidev/types";

export default defineMonacoSetup(() => {
  return {
    editorOptions: {
      showUnused: false,
      showFoldingControls: "never",
    },
  };
});
