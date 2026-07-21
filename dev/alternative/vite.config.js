import { defineConfig } from 'vite'

export default defineConfig({
    base: './',
    build: {
        rollupOptions: {
            output: {
                assetFileNames(assetInfo) {
                    if (assetInfo.names?.some(name => name.endsWith('.wasm'))) {
                        return 'wasm/[name]-[hash][extname]'
                    }
                    return 'assets/[name]-[hash][extname]'
                },
            },
        },
    },
})