module.exports = {
  locales: {
    '/': {
      lang: 'ru',
      title: 'TreeNSI',
      description: 'TreeNSI - Пример системы нормативно-справочной информации предприятия',
      ga: 'UA-143005666-1'
    }
  },
    head: [
      ['link', {rel: 'icon', type: "image/png", sizes: "16x16", href: '/logo.png'}]
    ],
    themeConfig: {
      sidebar: 'auto',
      logo: '/tree.png',
      repo: 'https://github.com/zloyAltr/treensi_wiki',
      repoLabel: 'GitHub',
      editLinks: false,
      nav: [
        { text: 'О чем речь', link: '/about.md' },
        { text: 'Система TreeNSI', 
        items: [
          {text: 'Описание TreeNSI', link: '/treensi/' },
          {text: 'Данные TreeNSI', link: '/treensi/data' },
          {text: 'Пример реализации', link: 'https://github.com/zloyAltr/TreeNSI' }
        ]},
        { text: 'Так исторически сложилось', link: '/so-historically/' }
      ]
    },
    configureWebpack: {
      resolve: {
        alias: {
          '@pict': 'd:/Project/TreeNSI_wiki/docs/pict'
        }
      }
    }
  }