#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif

#include <complex.h>

#ifdef __cplusplus
#define EXTERN extern "C"
#else
#define EXTERN
#endif

EXTERN EMSCRIPTEN_KEEPALIVE
int test(int n) {
    return n * n;
}