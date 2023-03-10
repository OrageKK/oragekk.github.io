#!/bin/bash
npm run docs:build
cd ./src/.vuepress/dist
touch CNAME
echo "oragekk.me" > CNAME
echo "\033[36;1m buid success & CANME success \033[0m"