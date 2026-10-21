// theme-without-fonts: the default theme minus its Inter preload and faces; the
// docs set IBM Plex in custom.css (MESHSAT-1614).
import DefaultTheme from 'vitepress/theme-without-fonts'
import { h, defineComponent, onMounted } from 'vue'
import type { EnhanceAppContext } from 'vitepress'
import ChannelStatus from './ChannelStatus.vue'
import NotFound from './NotFound.vue'
import './custom.css'

// The default home layout renders no <main>, leaving the hero and feature grid
// outside any landmark (axe: landmark-one-main, region). Doc pages already
// contain their own <main>, so promoting #VPContent unconditionally would nest
// two main landmarks. Toggle per page, idempotently.
function applyLandmark() {
  const vpc = document.querySelector('#VPContent')
  if (!vpc) return
  if (vpc.querySelector('main')) vpc.removeAttribute('role')
  else vpc.setAttribute('role', 'main')
}

function scheduleLandmark() {
  requestAnimationFrame(applyLandmark)
  // the page component swaps in asynchronously on SPA navigation
  setTimeout(applyLandmark, 150)
}

const Layout = defineComponent({
  name: 'MeshSatLayout',
  setup() {
    onMounted(scheduleLandmark)
    // The 404 in the site's own words (MESHSAT-1614); nginx serves it with a 404 status.
    return () => h(DefaultTheme.Layout, null, { 'not-found': () => h(NotFound) })
  },
})

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }: EnhanceAppContext) {
    // Opens every /transports/ page with its status code (MESHSAT-1498).
    app.component('ChannelStatus', ChannelStatus)
    if (typeof window !== 'undefined') {
      router.onAfterRouteChanged = () => scheduleLandmark()
    }
  },
}
