import DefaultTheme from 'vitepress/theme'
import { h, defineComponent, onMounted } from 'vue'
import type { EnhanceAppContext } from 'vitepress'
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
    return () => h(DefaultTheme.Layout)
  },
})

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ router }: EnhanceAppContext) {
    if (typeof window !== 'undefined') {
      router.onAfterRouteChanged = () => scheduleLandmark()
    }
  },
}
