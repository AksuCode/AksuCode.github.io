#!/usr/bin/env bash
cd "$(dirname "$0")"
set -e

IMAGE=vite-build

docker build -t "$IMAGE" .

docker create --name temp "$IMAGE"
docker cp temp:/app/dist ./dist
docker rm temp

if [ -d ../../docs/alternative ]; then
    rm -r ../../docs/alternative
fi
mkdir ../../docs/alternative
cp -r ./dist/* ../../docs/alternative/
rm -r ./dist