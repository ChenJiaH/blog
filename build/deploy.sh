#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git config user.name 'McChen'
git config user.email 'chenjiahao.xyz@gmail.com'
git add -A
git commit -m 'deploy'

git push -f git@github.com:ChenJiaH/blog.git master:gh-pages

cd -
