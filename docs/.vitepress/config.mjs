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
      { icon: 'github', link: 'https://github.com/cubeos-app/meshsat' },
      { icon: { svg: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>' }, ariaLabel: 'MeshSat on X', link: 'https://x.com/meshsat' },
      { icon: { svg: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043 7.26v1.157h.033c.309-.443.683-.784 1.117-1.024.433-.245.936-.365 1.5-.365.54 0 1.033.107 1.481.314.448.208.785.582 1.02 1.108.254-.374.6-.706 1.034-.992.434-.287.95-.43 1.546-.43.453 0 .872.056 1.26.167.388.11.716.286.993.53.276.245.489.559.646.951.152.392.23.863.23 1.417v5.728h-2.349V11.52c0-.286-.01-.559-.032-.812a1.755 1.755 0 0 0-.18-.66 1.106 1.106 0 0 0-.438-.448c-.194-.11-.457-.166-.785-.166-.332 0-.6.064-.803.189a1.38 1.38 0 0 0-.48.499 1.946 1.946 0 0 0-.231.696 5.56 5.56 0 0 0-.06.785v4.768h-2.35v-4.8c0-.254-.004-.503-.018-.752a2.074 2.074 0 0 0-.143-.688 1.052 1.052 0 0 0-.415-.503c-.194-.125-.476-.19-.854-.19-.111 0-.259.024-.439.074-.18.051-.36.143-.53.282-.171.138-.319.337-.439.595-.12.259-.18.6-.18 1.02v4.966H5.46V7.81zm15.693 15.64V.55H21.72V0H24v24h-2.28v-.55z"/></svg>' }, ariaLabel: 'MeshSat on Matrix', link: 'https://matrix.to/#/%23meshsat%3Amatrix.nuclearlighters.net' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/meshsat/' }
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
