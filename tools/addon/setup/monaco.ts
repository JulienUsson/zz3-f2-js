import { defineMonacoSetup } from "@slidev/types";

export default defineMonacoSetup(() => {
  return {
    editorOptions: {
      showUnused: false,
      showFoldingControls: "never",
      // Le bouton « plein écran » du thème redimensionne le conteneur :
      // sans cette option, Monaco garderait la taille qu'il avait à
      // l'ouverture et la moitié de l'écran resterait vide.
      automaticLayout: true,
    },
  };
});
