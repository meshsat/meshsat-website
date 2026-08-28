import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'MeshSat Docs',
  description: 'Documentation for MeshSat — unified routing across mesh, satellite, and IP networks',

  appearance: 'dark',

  head: [
    ['meta', { name: 'theme-color', content: '#0d9488' }],
  ],

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API Reference', link: '/api/' },
      { text: 'Changelog', link: 'https://gitlab.nuclearlighters.net/products/cubeos/meshsat/-/blob/main/CHANGELOG.md' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/guide/' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Quick Start', link: '/guide/quick-start' },
          { text: 'Configuration', link: '/guide/configuration' },
        ],
      },
      {
        text: 'Transports',
        items: [
          { text: 'Overview', link: '/transports/' },
          { text: 'Meshtastic', link: '/transports/meshtastic' },
          { text: 'Iridium SBD', link: '/transports/iridium-sbd' },
          { text: 'Iridium IMT', link: '/transports/iridium-imt' },
          { text: 'Cellular', link: '/transports/cellular' },
          { text: 'ZigBee', link: '/transports/zigbee' },
          { text: 'MQTT', link: '/transports/mqtt' },
          { text: 'Webhooks', link: '/transports/webhooks' },
          { text: 'APRS', link: '/transports/aprs' },
          { text: 'TAK', link: '/transports/tak' },
        ],
      },
      {
        text: 'Architecture',
        items: [
          { text: 'Overview', link: '/architecture/' },
          { text: 'Policy Engine', link: '/architecture/policy-engine' },
          { text: 'Transform Pipeline', link: '/architecture/transform-pipeline' },
          { text: 'Pass Scheduler', link: '/architecture/pass-scheduler' },
          { text: 'Dead Letter Queue', link: '/architecture/dead-letter-queue' },
        ],
      },
      {
        text: 'Hub',
        items: [
          { text: 'Overview', link: '/hub/' },
          { text: 'Authentication', link: '/hub/authentication' },
          { text: 'Tenants', link: '/hub/tenants' },
          { text: 'API Keys', link: '/hub/api-keys' },
        ],
      },
      {
        text: 'API Reference',
        items: [
          { text: 'REST API', link: '/api/' },
          { text: 'WebSocket', link: '/api/websocket' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cubeos-app/meshsat' },
      { icon: { svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>' }, ariaLabel: 'MeshSat on X', link: 'https://x.com/meshsat' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/meshsat/' }
    ],

    footer: {
      message: 'Made by MeshSat',
    },

    editLink: {
      pattern: 'https://gitlab.nuclearlighters.net/products/cubeos/meshsat-website/-/edit/main/docs/:path',
      text: 'Edit this page on GitLab',
    },

    search: {
      provider: 'local',
    },
  },
})
