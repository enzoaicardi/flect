import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Flect",
  description: "the first 2kb fuly reactive component library",
  themeConfig: {
    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Try-it', link: '/try-it' }
    ],

    sidebar: [
      {
        text: 'Learn',
        items: [
          { text: 'Get started', link: 'starter/get-started' },
          { text: 'Define component', link: 'starter/define' },
          { text: 'Bind attributes', link: 'starter/bind-attributes' },
          { text: 'Bind datas', link: 'starter/bind-datas' }
        ]
      },
      {
        text: 'Ressources',
        items: [
          { text: 'Specials attributes', link: 'ressources/specials-attributes' },
          { text: 'Datas limitations', link: 'ressources/datas-limitations' },
          { text: 'Scoped style', link: 'ressources/scoped-style' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/enzoaicardi/flect' }
    ]
  }
})
