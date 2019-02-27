module.exports = {
    title: 'Learning iOS',
    description: 'Notes in learning iOS',
    base: '/Learning-iOS/',
    themeConfig: {
        sidebarDepth: 2,
        repo: 'chuxubank/Learning-iOS',
        editLinks: true,
        nav: [{
                text: 'Home',
                link: '/'
            },
            {
                text: 'Stanford',
                items: [{
                    text: 'CS193P iPhone Application Development',
                    items: [{
                        text: 'Developing iOS 11 Apps with Swift',
                        link: '/Developing-iOS-11-Apps-with-Swift/'
                    }]
                }]
            }
        ],
        sidebar: {
            '/Developing-iOS-11-Apps-with-Swift/': [
                'L1-Introduction-to-iOS11-Xcode9-Swift4/',
                'L2-MVC-iOS-Xcode-Swift-Demonstration/'
            ]
        }
    },
    plugins: [
        '@vuepress/back-to-top',
        '@vuepress/last-updated'
    ],
    markdown: {
        extendMarkdown: md => {
            md.use(require('markdown-it-checkbox'))
            md.use(require('markdown-it-plantuml'))
            md.use(require('markdown-it-mermaid').default)
        }
    }
}