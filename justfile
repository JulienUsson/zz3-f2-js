dev: 
  devenv shell zsh

code: 
  devenv shell code -- --no-sandbox .

build:
  #!/usr/bin/env bash
  rm -rf dist
  for SLIDES_PATH in slides/src/*.md; do
    SLIDES_FILENAME=$(basename "$SLIDES_PATH")
    SLIDES_NAME=$(basename "$SLIDES_PATH" .md)
    mkdir -p "dist/$SLIDES_NAME"
    pnpm slides:build "src/$SLIDES_FILENAME" --out "../../dist/$SLIDES_NAME" --base "/$SLIDES_NAME/"
  done