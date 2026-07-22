import createModule from "../wasm/cpp_api.js";

export const ModulePromise = createModule(
    {
        locateFile(path, prefix) {
            return '/alternative/wasm/cpp_api.wasm';
        }
    }
);