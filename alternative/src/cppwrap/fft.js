import { ModulePromise } from './loader.js';

const Module = await ModulePromise;

export async function test() {
  const square = Module._test(2);
  console.log(square);
}