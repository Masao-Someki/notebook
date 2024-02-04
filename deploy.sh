#!/usr/bin/env sh

# abort on errors
set -e

# First move the documents into docs directory
documents=("espnet2" "tutorials" "espnetez")

for document in "${documents[@]}"; do
    rm -rf ./docs/$document
    cp -rf "./${document}" ./docs/
done

cp -rf ./README.md ./docs/README.md

# Second, convert into markdown
find ./docs \
    -type f \
    -name '*.ipynb' \
    -exec bash -c "jupyter nbconvert --clear-output \"{}\"" \;

find ./docs \
    -type f \
    -name '*.ipynb' \
    -exec bash -c "jupyter nbconvert --to markdown \"{}\"" \;


# build
npm run docs:build

cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Masao-Someki/notebook.git master:gh-pages

cd -