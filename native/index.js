import { createRequire } from 'module';
import os from 'os'

const currentPlatfom = os.platform()
const arch = os.arch()

if(currentPlatfom !== "linux" || currentPlatfom !== "win32") {
    throw "Your platform is not supported yet"
}
if("x64" !== arch) {
    console.log("WARNING: arch mismatch!, currently only x64 is supported")
}
/* const platforms = {
    "aix": null, 
    "android": null, 
    "darwin": null, 
    "freebsd": null, 
    "linux": "linux", 
    "openbsd": null, 
    "sunos": null, 
    "win32": "win32", 
    "cygwin": null, 
    "netbsd": null
} */

const require = createRequire(import.meta.url);
const { export_box } = require(`./${currentPlatfom}/index.node`);
export default export_box