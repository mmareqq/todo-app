/// <reference types="vite/client" />

interface ImportMetaEnv {
   readonly VITE_API_URL: string;
   readonly VITE_API_PORT: number;
   readonly MODE: 'development' | 'production' | 'test';
}

interface ImportMeta {
   readonly env: ImportMetaEnv;
}
