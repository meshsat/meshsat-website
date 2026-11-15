# meshsat-website

The source of [meshsat.net](https://meshsat.net) (Hugo, in `site/`) and [docs.meshsat.net](https://docs.meshsat.net) (VitePress, in `docs/`).

## Mission and use policy

MeshSat does not work with any organisation that develops, produces, integrates or operates weapon systems, and provides nothing for use in one. The licence below is unchanged: the policy covers whom we work with, not what you may do with the code. Read the [MeshSat Mission and Use Policy](https://meshsat.net/policy/).

## Licence

GNU General Public License v3.0, see [LICENSE](LICENSE).

## Compact v2 campaign

The project hero keeps Bridge, Android and Hub as its three primary setup buttons.
The separate launch banner, navigation and footer use `shop_url`, `kickstarter_url` and
`campaign_state` in `site/hugo.yaml`. Keep the state at `prelaunch` until the campaign
opens, then change it to `live` and deploy normally. Both states have copy in all five
language catalogues. There is no date-based switch. Campaign and shop clicks use the
existing Umami events with placement (`from`) and `locale` properties.
