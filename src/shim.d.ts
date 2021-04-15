import type { DefineComponent } from 'vue'

declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.jpg'

declare global {
  interface Date {
    Format (fmt?: string) : string
  }
}