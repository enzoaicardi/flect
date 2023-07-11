import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Flect",
  description: "the 2kb fuly reactive component library",
  outDir: '../doc',
  base: '/doc/',
  themeConfig: {
    logo: '../assets/logo.svg',

    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Try-it', link: 'https://flect.aicardi.pro/try-it.html' }
    ],

    sidebar: [
      {
        text: 'Learn',
        items: [
          { text: 'Get started', link: '/starter/get-started' },
          { text: 'Define component', link: '/starter/define' },
          { text: 'Render function', link: '/starter/render' },
          { text: 'Bind attributes', link: '/starter/bind-attributes' },
          { text: 'Bind datas', link: '/starter/bind-datas' }
        ]
      },
      {
        text: 'Ressources',
        items: [
          { text: 'Attributes', link: '/resources/attributes' },
          { text: 'Methods', link: '/resources/methods' },
          { text: 'Properties', link: '/resources/properties' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/enzoaicardi/flect' }
    ]
  }
})
