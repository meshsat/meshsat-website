# Built-site browser checks

Build Hugo into a scratch directory and build VitePress with `npm run build --prefix docs`.
Then install the pinned dependencies and run:

```sh
npm ci --prefix tests/browser
node tests/browser/check.cjs /path/to/hugo-build docs/.vitepress/dist /tmp/meshsat-browser-results
```

The test process needs a compatible Playwright Chromium installation. CI supplies it with
the pinned Playwright image. No development server is started: browser requests for the
site and docs are fulfilled from the build trees, with each site's nginx CSP applied.
Third-party services receive fixture responses, so these checks do not depend on their uptime.

Checks cover five languages, both themes, widths 320/390/768/1440, mobile navigation,
keyboard disclosures, clipboard, dialogs, media consent, the integrator configurator,
no-JavaScript navigation, forced colors and reduced motion. Axe checks the relevant WCAG
A/AA and best-practice rules, including open dialogs. Screenshots and results are retained as CI artifacts.

`CHECK_FILTER` accepts a regular expression for a focused rerun while developing a fix.
Run the complete suite before publishing. Production QA must also verify the deployed
release marker, headers, installer checksum and real network responses.

The transport registry is `site/data/transports.json`, shared by Hugo and VitePress.
Its evidence links point to the transport pages; update the dated review entry and the
page's evidence together when a capability changes. Status labels do not imply reliability.
