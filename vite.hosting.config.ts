import {defineConfig,loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';

export default defineConfig(({mode})=>{
 const env={...loadEnv(mode,process.cwd(),''),...process.env};
 const config={apiKey:env.VITE_FIREBASE_API_KEY||'',authDomain:'careerguidaance.firebaseapp.com',projectId:'careerguidaance',appId:env.VITE_FIREBASE_APP_ID||''};
 const api=env.VITE_API_URL?.replace(/\/$/,'')||'';
 if(!config.apiKey||!config.appId||!/^https:\/\//.test(api))throw new Error('Set VITE_FIREBASE_API_KEY, VITE_FIREBASE_APP_ID and HTTPS VITE_API_URL before building.');
 return {root:resolve('web'),publicDir:resolve('public'),plugins:[react()],define:{__HOSTED__:'true',__FIREBASE_CONFIG__:JSON.stringify(config),__API_URL__:JSON.stringify(api)},build:{outDir:resolve('dist-hosting'),emptyOutDir:true},css:{postcss:resolve('postcss.config.mjs')}};
});
