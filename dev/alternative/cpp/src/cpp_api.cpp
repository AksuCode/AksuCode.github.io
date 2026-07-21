#include <stdio.h>

#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
void Hello() {
    printf("Hello World! From C++!\n");
}