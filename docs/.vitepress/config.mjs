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
      { text: 'Bridge', link: '/guide/getting-started' },
      { text: 'Hub', link: '/hub/' },
      { text: 'Android', link: '/android/' },
      { text: 'API', link: '/api/' },
      {
        text: 'Links',
        items: [
          { text: 'meshsat.net', link: 'https://meshsat.net' },
          { text: 'MeshSat Hub', link: 'https://hub.meshsat.net' },
          { text: 'GitHub (Bridge)', link: 'https://github.com/cubeos-app/meshsat' },
          { text: 'GitHub (Android)', link: 'https://github.com/cubeos-app/meshsat-android' },
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
      '/hub/': [
        {
          text: 'MeshSat Hub',
          items: [
            { text: 'Overview', link: '/hub/' },
            { text: 'Authentication', link: '/hub/authentication' },
            { text: 'API Keys', link: '/hub/api-keys' },
            { text: 'Multi-Tenancy', link: '/hub/tenants' },
          ]
        }
      ],
      '/android/': [
        {
          text: 'MeshSat Android',
          items: [
            { text: 'Overview', link: '/android/' },
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
      message: 'GPLv3 Licensed',
      copyright: 'Copyright © 2026 MeshSat'
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
