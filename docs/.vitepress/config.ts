import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en',
  title: 'MeshSat Docs',
  description: 'Documentation for MeshSat: unified routing across mesh, satellite, and IP networks',

  appearance: 'dark',

  sitemap: { hostname: 'https://docs.meshsat.net' },

  // Every page answers at /page AND /page.html (nginx resolves $uri.html), and
  // READMEs link the short form while the docs link .html. With no canonical,
  // Google saw two copies and filed them as "Duplicate without user-selected
  // canonical" (MESHSAT-1183, validation failed Oct 2026). The canonical is the
  // form the sitemap and internal links use: page.html, and dir/ for index.md.
  transformPageData(pageData) {
    const canonical = `https://docs.meshsat.net/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(['link', { rel: 'canonical', href: canonical }])
    // Social metadata per page (MESHSAT-1614): the page's own description where
    // the frontmatter has one, the site's otherwise; the site's link card image.
    const title = pageData.title ? `${pageData.title} | MeshSat Docs` : 'MeshSat Docs'
    const description = pageData.description || pageData.frontmatter.description || 'Documentation for MeshSat: unified routing across mesh, satellite, and IP networks'
    for (const tag of [
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:type', content: 'article' }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { property: 'og:site_name', content: 'MeshSat' }],
      ['meta', { property: 'og:image', content: 'https://meshsat.net/images/og-image.jpg' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:image', content: 'https://meshsat.net/images/og-image.jpg' }],
    ]) pageData.frontmatter.head.push(tag)
  },

  head: [
    ['meta', { name: 'theme-color', content: '#040406' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
  ],

  themeConfig: {
    logo: { light: '/logo-light.png', dark: '/logo-dark.png', alt: '' },
    nav: [
      { text: 'Start', link: '/start' },
      { text: 'Products', items: [
        { text: 'Bridge', link: '/guide/getting-started' },
        { text: 'Hub', link: '/hub/' },
        { text: 'Android', link: '/android/' },
        { text: 'iOS', link: '/ios/' },
        { text: 'Linux', link: '/linux/' },
        { text: 'Node', link: '/node/' },
      ] },
      { text: 'Transports', link: '/transports/' },
      { text: 'Reference', items: [
        { text: 'API', link: '/api/' },
        { text: 'Architecture', link: '/architecture/' },
        { text: 'Environment variables', link: '/reference/environment-variables' },
        { text: 'Project sources', link: '/projects' },
      ] },
    ],

    sidebar: {
      '/start': [{ text: 'Start here', items: [
        { text: 'Choose your setup', link: '/start' },
        { text: 'Project sources', link: '/projects' },
      ] }],
      '/projects': [{ text: 'Start here', items: [
        { text: 'Choose your setup', link: '/start' },
        { text: 'Project sources', link: '/projects' },
      ] }],
      '/linux/': [{ text: 'Linux', items: [
        { text: 'Setup and limits', link: '/linux/' },
        { text: 'Choose your setup', link: '/start' },
        { text: 'Project sources', link: '/projects' },
      ] }],
      '/guide/': [
        {
          text: 'Bridge',
          items: [
            { text: 'Getting started', link: '/guide/getting-started' },
            { text: 'What MeshSat is', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick start', link: '/guide/quick-start' },
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'Hardware', link: '/guide/hardware' },
            { text: 'Radios and range', link: '/guide/radios-and-range' },
            { text: 'Troubleshooting', link: '/guide/troubleshooting' },
          ],
        },
        {
          text: 'Features',
          items: [
            { text: 'Access rules', link: '/guide/features/access-rules' },
            { text: 'Compression', link: '/guide/features/compression' },
            { text: 'Failover', link: '/guide/features/failover' },
            { text: 'Field intelligence', link: '/guide/features/field-intelligence' },
            { text: 'Satellite passes', link: '/guide/features/passes' },
            { text: 'Reticulum', link: '/guide/features/reticulum' },
            { text: 'Security', link: '/guide/features/security' },
            { text: 'Transforms', link: '/guide/features/transforms' },
          ],
        },
      ],

      '/hub/': [
        {
          text: 'Using the Hub',
          items: [
            { text: 'Overview', link: '/hub/' },
            { text: 'Accounts and plans', link: '/hub/accounts' },
            { text: 'Connect a bridge', link: '/hub/connect-a-bridge' },
            { text: 'Devices', link: '/hub/devices' },
            { text: 'Map and messages', link: '/hub/map-and-messages' },
            { text: 'SOS and escalation', link: '/hub/sos-and-escalation' },
            { text: 'Provider accounts', link: '/hub/provider-accounts' },
            { text: 'TAK', link: '/hub/tak' },
            { text: 'Reticulum', link: '/hub/reticulum' },
            { text: 'Your team', link: '/hub/team' },
            { text: 'Your data', link: '/hub/your-data' },
            { text: 'Hub API', link: '/hub/api' },
            { text: 'API keys', link: '/hub/api-keys' },
            { text: 'When something does not work', link: '/hub/troubleshooting' },
          ],
        },
        {
          text: 'Running your own',
          items: [
            { text: 'Self-hosting', link: '/hub/self-hosting' },
            { text: 'Authentication', link: '/hub/authentication' },
            { text: 'Multi-tenancy', link: '/hub/tenants' },
            { text: 'Configuration', link: '/reference/hub-configuration' },
          ],
        },
      ],

      '/android/': [
        {
          text: 'Android',
          items: [
            { text: 'Overview', link: '/android/' },
            { text: 'Set up', link: '/android/setup' },
            { text: 'Satellite', link: '/android/satellite' },
            { text: 'Safety', link: '/android/safety' },
          ],
        },
      ],

      '/ios/': [
        {
          text: 'iOS',
          items: [
            { text: 'Overview', link: '/ios/' },
          ],
        },
      ],

      '/node/': [
        {
          text: 'Node',
          items: [
            { text: 'Overview', link: '/node/' },
            { text: 'Build a node', link: '/node/build' },
            { text: 'Iridium Bluetooth service', link: '/node/iridium-ble' },
            { text: 'Conformity documents', link: '/conformity/' },
        { text: 'Compact v2 conformity', link: '/conformity/msc-2/' },
          ],
        },
      ],

      // The conformity page is the QR target printed on every MSC-2 label
      // (MESHSAT-1508): its URL never moves. It shares the Node sidebar.
      '/conformity/': [
        {
          text: 'Node',
          items: [
            { text: 'Overview', link: '/node/' },
            { text: 'Build a node', link: '/node/build' },
            { text: 'Iridium Bluetooth service', link: '/node/iridium-ble' },
            { text: 'Conformity documents', link: '/conformity/' },
        { text: 'Compact v2 conformity', link: '/conformity/msc-2/' },
          ],
        },
      ],

      '/transports/': [
        {
          text: 'Transports',
          items: [
            { text: 'Overview and status codes', link: '/transports/' },
          ],
        },
        {
          text: 'Satellite',
          items: [
            { text: 'Iridium IMT', link: '/transports/iridium-imt' },
            { text: 'Iridium through a node', link: '/transports/iridium-node' },
            { text: 'Iridium SBD', link: '/transports/iridium-sbd' },
          ],
        },
        {
          text: 'Radio',
          items: [
            { text: 'Meshtastic', link: '/transports/meshtastic' },
            { text: 'APRS', link: '/transports/aprs' },
            { text: 'Cellular', link: '/transports/cellular' },
            { text: 'Wi-Fi', link: '/transports/wifi' },
            { text: '10 m HF shouts', link: '/transports/hf-10m' },
            { text: 'HF data', link: '/transports/hf-data' },
            { text: 'TETRA Direct Mode', link: '/transports/tetra' },
            { text: 'Wi-Fi HaLow', link: '/transports/halow' },
            { text: 'Own 2G cell', link: '/transports/gsm-cell' },
          ],
        },
        {
          text: 'Wired',
          items: [
            { text: 'Fiber', link: '/transports/fiber' },
            { text: 'Single-pair copper', link: '/transports/single-pair-ethernet' },
          ],
        },
        {
          text: 'Short range',
          items: [
            { text: 'ZigBee', link: '/transports/zigbee' },
            { text: 'Bluetooth LE', link: '/transports/ble' },
            { text: 'RNode', link: '/transports/rnode' },
            { text: 'KISS TNC', link: '/transports/kiss' },
          ],
        },
        {
          text: 'IP and Hub',
          items: [
            { text: 'Hub link', link: '/transports/hub-link' },
            { text: 'MQTT', link: '/transports/mqtt' },
            { text: 'TAK', link: '/transports/tak' },
            { text: 'Webhooks', link: '/transports/webhooks' },
            { text: 'IP mesh: UDP and AutoInterface', link: '/transports/ip-mesh' },
          ],
        },
        {
          text: 'Receive only',
          items: [
            { text: 'Jamming watch', link: '/transports/jamming-watch' },
            { text: 'Cell broadcast alerts', link: '/transports/cell-broadcast' },
            { text: 'DCF77 time signal', link: '/transports/dcf77' },
          ],
        },
      ],

      '/architecture/': [
        {
          text: 'Architecture',
          items: [
            { text: 'Overview', link: '/architecture/' },
            { text: 'Policy engine', link: '/architecture/policy-engine' },
            { text: 'Transform pipeline', link: '/architecture/transform-pipeline' },
            { text: 'Pass scheduler', link: '/architecture/pass-scheduler' },
            { text: 'Dead letter queue', link: '/architecture/dead-letter-queue' },
          ],
        },
      ],

      '/': [
        {
          text: 'Bridge API',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'Interfaces', link: '/api/interfaces' },
            { text: 'Messages', link: '/api/messages' },
            { text: 'Rules', link: '/api/rules' },
            { text: 'Config', link: '/api/config' },
            { text: 'Deliveries', link: '/api/deliveries' },
          ],
        },
        {
          text: 'Reference',
          items: [
            { text: 'Environment variables', link: '/reference/environment-variables' },
            { text: 'Hub configuration', link: '/reference/hub-configuration' },
            { text: 'Database', link: '/reference/database' },
            { text: 'Ports', link: '/reference/ports' },
          ],
        },
      ],
    },

    editLink: {
      pattern: 'https://github.com/meshsat/meshsat-website/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    search: {
      provider: 'local',
    },
  },
})
