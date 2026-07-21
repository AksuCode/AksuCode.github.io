#!/usr/bin/env bash
cd "$(dirname "$0")"
set -e

# !!!
cd wasm

IMAGE=wasm-builder

docker build -t "$IMAGE" .

if [ -d ./dist ]; then
    rm -r ./dist
fi

docker run --name temp "$IMAGE"
docker cp temp:/workspace/build/ ./dist
docker rm temp