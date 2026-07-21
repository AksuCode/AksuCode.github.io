#!/usr/bin/env bash
cd "$(dirname "$0")"
set -e

OUTDIR=${OUTDIR:-build}

mkdir -p "$OUTDIR"

emcc ./src/cpp_api.cpp \
    -O3 \
    -s WASM=1 \
    -s EXPORTED_RUNTIME_METHODS='["cwrap", "HEAP8"]' \
    -o "$OUTDIR"/cpp_api.js