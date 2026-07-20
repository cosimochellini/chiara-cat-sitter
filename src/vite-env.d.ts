/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Assente quando la variabile non è configurata: Vite la inlinea come undefined.
  readonly VITE_WEB3FORMS_ACCESS_KEY: string | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
