import '../../wasm/dist/cpp_api.js';

export function test() {
    Module.onRuntimeInitialized = async () => {
        const api = {
            hello: Module.cwrap("Hello", "null", []),
        };
        
        api.hello();
    };
}