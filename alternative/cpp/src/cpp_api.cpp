#include <stdio.h>

#include <emscripten.h>

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    int test(int n) {
        return n * n;
    }
}