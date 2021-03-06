import fs from 'fs'
import path from 'path'

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


var wasm;

let cachedEncoder = new TextEncoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null ||
        cachegetUint8Memory.buffer !== wasm.memory.buffer)
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    return cachegetUint8Memory;
}

function passStringToWasm(arg) {

    const buf = cachedEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    return [ptr, buf.length];
}

let cachedDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null)
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null ||
        cachegetUint32Memory.buffer !== wasm.memory.buffer)
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    return cachegetUint32Memory;
}

const moduleImports = {

    boxify: function (arg0) {
        const [ptr0, len0] = passStringToWasm(arg0);
        const retptr = globalArgumentPtr();
        try {
            wasm.boxify(retptr, ptr0, len0);
            const mem = getUint32Memory();
            const ptr = mem[retptr / 4];
            const len = mem[retptr / 4 + 1];
            const realRet = getStringFromWasm(ptr, len).slice();
            wasm.__wbindgen_free(ptr, len * 1);
            return realRet;
        } finally {
            wasm.__wbindgen_free(ptr0, len0 * 1);
        }
    },

    __wbindgen_throw: function (ptr, len) {
        throw new Error(getStringFromWasm(ptr, len));
    }
}

function init() {
    return WebAssembly.compile(fs.readFileSync(path.join(__dirname, '/output.wasm')))
        .then(buffer => WebAssembly.instantiate(buffer, { './rustc_h_xgn26az6una': moduleImports }))
        .then((wasmModule) => {
            wasm = init.wasm = wasmModule.exports;
            return;
        });
};


export default Object.assign(init, moduleImports);