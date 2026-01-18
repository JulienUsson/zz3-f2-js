dev: 
  devenv shell zsh

code: 
  devenv shell code -- --no-sandbox .

update:
  devenv update

build:
  pnpm run build

preview:
  #!/usr/bin/env bash
  for SLIDESHOW in slides/*; do
    if [[ "$SLIDESHOW" =~ ^slides/slidev- ]]; then 
      continue; 
    fi
    SLIDESHOW=$(basename $SLIDESHOW)
    pnpm --filter $SLIDESHOW preview --output "../../practices/public/preview/${SLIDESHOW}"
  done