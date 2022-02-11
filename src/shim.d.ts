/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
};

declare module "*.jpg" {
  const value: any;
  export default value;
};

declare global {
  interface Date {
    Format (fmt?: string) : string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
};