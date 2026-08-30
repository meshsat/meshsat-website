import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'MeshSat Docs',
  description: 'Documentation for MeshSat: unified routing across mesh, satellite, and IP networks',

  appearance: 'dark',

  sitemap: { hostname: 'https://docs.meshsat.net' },

  head: [
    ['meta', { name: 'theme-color', content: '#040406' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
  ],

  themeConfig: {
    logo: { light: '/logo-light.png', dark: '/logo-dark.png', alt: '' },
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
      { icon: 'github', link: 'https://github.com/meshsat/meshsat' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/meshsat/' },
      { icon: { svg: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>' }, ariaLabel: 'MeshSat on X', link: 'https://x.com/meshsat' },
      { icon: 'youtube', link: 'https://www.youtube.com/@MeshSat' },
      { icon: 'facebook', link: 'https://www.facebook.com/meshsat' },
      { icon: { svg: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043 7.26v1.157h.033c.309-.443.683-.784 1.117-1.024.433-.245.936-.365 1.5-.365.54 0 1.033.107 1.481.314.448.208.785.582 1.02 1.108.254-.374.6-.706 1.034-.992.434-.287.95-.43 1.546-.43.453 0 .872.056 1.26.167.388.11.716.286.993.53.276.245.489.559.646.951.152.392.23.863.23 1.417v5.728h-2.349V11.52c0-.286-.01-.559-.032-.812a1.755 1.755 0 0 0-.18-.66 1.106 1.106 0 0 0-.438-.448c-.194-.11-.457-.166-.785-.166-.332 0-.6.064-.803.189a1.38 1.38 0 0 0-.48.499 1.946 1.946 0 0 0-.231.696 5.56 5.56 0 0 0-.06.785v4.768h-2.35v-4.8c0-.254-.004-.503-.018-.752a2.074 2.074 0 0 0-.143-.688 1.052 1.052 0 0 0-.415-.503c-.194-.125-.476-.19-.854-.19-.111 0-.259.024-.439.074-.18.051-.36.143-.53.282-.171.138-.319.337-.439.595-.12.259-.18.6-.18 1.02v4.966H5.46V7.81zm15.693 15.64V.55H21.72V0H24v24h-2.28v-.55z"/></svg>' }, ariaLabel: 'MeshSat on Matrix', link: 'https://matrix.to/#/%23meshsat%3Amatrix.nuclearlighters.net' },
      { icon: { svg: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>' }, ariaLabel: 'MeshSat on Reddit', link: 'https://www.reddit.com/r/meshsat/' }
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
