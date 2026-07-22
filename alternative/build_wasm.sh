#!/usr/bin/env bash
cd "$(dirname "$0")"
set -e

# !!!
cd cpp

IMAGE=wasm-builder

docker build -t "$IMAGE" .

OUTDIR="../wasm"

if [ -d "$OUTDIR" ]; then
    rm -r "$OUTDIR"
fi

mkdir -p "$OUTDIR"

docker container inspect temp >/dev/null 2>&1 && docker rm temp
docker run --name temp "$IMAGE"
docker cp temp:/workspace/build/. "$OUTDIR"
docker rm temp