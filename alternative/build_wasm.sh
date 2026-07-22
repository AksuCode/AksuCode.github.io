#!/usr/bin/env bash
cd "$(dirname "$0")"
set -e

# !!!
cd cpp

IMAGE=wasm-builder

docker build -t "$IMAGE" .

OUTDIR_WASM="../public/wasm"
OUTDIR_JS="../src/wasm"

if [ -d "$OUTDIR_WASM" ]; then
    rm -r "$OUTDIR_WASM"
fi

if [ -d "$OUTDIR_JS" ]; then
    rm -r "$OUTDIR_JS"
fi

mkdir -p "$OUTDIR_WASM"
mkdir -p "$OUTDIR_JS"

docker container inspect temp >/dev/null 2>&1 && docker rm temp
docker run --name temp "$IMAGE"
docker cp temp:/workspace/build/cpp_api.wasm "$OUTDIR_WASM"
docker cp temp:/workspace/build/cpp_api.js "$OUTDIR_JS"
docker rm temp