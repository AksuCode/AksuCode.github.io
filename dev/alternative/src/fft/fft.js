import '../../public/wasm/cpp_api.js'

export async function test() {
  Module.onRuntimeInitialized = async () => {
    const api = {
      Hello: Module.cwrap("Hello", null, []),
    };
    api.Hello();
  };
}