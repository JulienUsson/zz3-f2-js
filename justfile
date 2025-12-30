dev: 
  devenv shell zsh

code: 
  devenv shell code -- --no-sandbox .

update:
  devenv update

build:
  pnpm run build

export-preview:
  #!/usr/bin/env bash
  rm -rf ./practices/public/preview/*
  for SLIDE in slides/src/*; do
    SLIDE_FILENAME=$(basename "$SLIDE");
    SLIDE_NAME=$(basename "$SLIDE" .md);
    pnpm slides:export src/${SLIDE_FILENAME} --format png --range 1 --output ../practices/public/preview/${SLIDE_NAME}
  done