dev: 
  devenv shell zsh

code: 
  devenv shell code -- --no-sandbox .

update:
  devenv update

build:
  pnpm run build

thumbnails:
  pnpm run thumbnails
