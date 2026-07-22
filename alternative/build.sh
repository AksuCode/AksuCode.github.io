#!/usr/bin/env bash
cd "$(dirname "$0")"
set -e

IMAGE=vite-build

docker build -t "$IMAGE" .

docker container inspect temp >/dev/null 2>&1 && docker rm temp
docker create --name temp "$IMAGE"
docker cp temp:/app/dist ./dist
docker rm temp

if [ -d ../docs/alternative ]; then
    rm -r ../docs/alternative
fi
mkdir ../docs/alternative
mkdir ./dist/wasm
cp -r ./wasm/*.wasm ./dist/wasm/
cp -r ./dist/* ../docs/alternative/
rm -r ./dist