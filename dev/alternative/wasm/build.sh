#!/usr/bin/env bash
cd "$(dirname "$0")"
set -e

OUTDIR=${OUTDIR:-build}

mkdir -p "$OUTDIR"

emcc -O3 \
    -s WASM=1 \
    -s EXPORTED_RUNTIME_METHODS='["cwrap", "HEAP8"]' \
    ./src/cpp_api.cpp \
    -o ./build/cpp_api.js