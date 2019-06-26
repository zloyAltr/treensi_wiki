module.exports = {
    title: 'TreeNSI',
    description: 'TreeNSI - Пример системы нормативно-справочной информации предприятия',
    head: [
      ['link', {rel: 'icon', type: "image/png", sizes: "16x16", href: '/logo.png'}]
    ],
    themeConfig: {
      sidebar: 'auto',
      // logo: '/MacTree.ico',
      nav: [
        { text: 'О чем речь', link: '/' },
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