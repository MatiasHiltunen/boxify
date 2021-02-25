import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { defaultArgs } = require('./index.node');
export default defaultArgs