import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'MeshSat Docs',
  description: 'Documentation for MeshSat Bridge, Hub, and Android',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'MeshSat Docs',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API Reference', link: '/api/' },
      { text: 'Reference', link: '/reference/environment-variables' },
      {
        text: 'Products',
        items: [
          { text: 'meshsat.net', link: 'https://meshsat.net' },
          { text: 'MeshSat Hub', link: 'https://hub.meshsat.net' },
          { text: 'GitHub', link: 'https://github.com/cubeos-app/meshsat' },
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'Hardware Setup', link: '/guide/hardware' },
          ]
        },
        {
          text: 'Transports',
          items: [
            { text: 'Meshtastic', link: '/guide/transports/meshtastic' },
            { text: 'Iridium SBD (9603N)', link: '/guide/transports/iridium-sbd' },
            { text: 'Iridium IMT (9704)', link: '/guide/transports/iridium-imt' },
            { text: 'Astrocast', link: '/guide/transports/astrocast' },
            { text: 'Cellular SMS', link: '/guide/transports/cellular' },
            { text: 'ZigBee', link: '/guide/transports/zigbee' },
            { text: 'MQTT', link: '/guide/transports/mqtt' },
            { text: 'APRS', link: '/guide/transports/aprs' },
            { text: 'TAK/CoT', link: '/guide/transports/tak' },
          ]
        },
        {
          text: 'Features',
          items: [
            { text: 'Access Rules', link: '/guide/features/access-rules' },
            { text: 'Transform Pipeline', link: '/guide/features/transforms' },
            { text: 'Failover Groups', link: '/guide/features/failover' },
            { text: 'Compression', link: '/guide/features/compression' },
            { text: 'Satellite Passes', link: '/guide/features/passes' },
            { text: 'Field Intelligence', link: '/guide/features/field-intelligence' },
            { text: 'Reticulum Routing', link: '/guide/features/reticulum' },
          ]
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'Messages', link: '/api/messages' },
            { text: 'Interfaces', link: '/api/interfaces' },
            { text: 'Rules', link: '/api/rules' },
            { text: 'Config', link: '/api/config' },
            { text: 'Deliveries', link: '/api/deliveries' },
          ]
        }
      ],
      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'Environment Variables', link: '/reference/environment-variables' },
            { text: 'Database Schema', link: '/reference/database' },
            { text: 'Port Allocation', link: '/reference/ports' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cubeos-app/meshsat' }
    ],

    footer: {
      message: 'Apache 2.0 Licensed',
      copyright: 'Copyright © 2026 Nuclear Lighters Inc.'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/cubeos-app/meshsat-website/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
