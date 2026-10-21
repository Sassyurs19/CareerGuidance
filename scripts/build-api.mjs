import {build} from 'esbuild';
await build({entryPoints:['server/index.ts'],outfile:'dist-api/index.mjs',bundle:true,platform:'node',target:'node22',format:'esm',packages:'external'});
