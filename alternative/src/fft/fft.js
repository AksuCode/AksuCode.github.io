import { ModulePromise } from '../utils/loader.js';

export async function test() {
  const Module = await ModulePromise;

  const square = Module._test(2);
  console.log(square);
}