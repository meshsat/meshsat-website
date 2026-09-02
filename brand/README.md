# MeshSat brand package (approved, delivered 2026-08-28)

Final approved brand asset package. This directory is the durable copy of the source
files; it is not part of any Docker build context and is never published to the sites.

| File | Contents |
|------|----------|
| `MeshSat_Brand_Guide.pdf` | 8-page brand guide: canonical masters, core variants, icon sizes, web/social/app exports, field-kit stickers, colors, production rules |
| `MeshSat_sticker_80x31mm_EXACT.pdf` | Print-ready sticker. Embeds the highest-resolution master: a 4716x971 transparent full lockup at 1753 ppi |
| `MeshSat_sticker_80x31mm_proof.png` | Sticker proof render |
| `MeshSat_sticker_35x105mm_Drukwerkdeal_41x111.pdf` | Print-ready 35 x 105 mm sticker on Drukwerkdeal's Kleine stickers werktekening: 41 x 111 mm page (3 mm bleed all round), portrait, TrimBox set, CMYK, PDF 1.6. Same master, scaled to 85 percent of the trim width. First ordered 2026-09-02 (order 15720445, 50 pcs) |
| `MeshSat_sticker_35x105mm_proof.png` | Proof render of the 35 x 105 file |
| `PREVIEW_FINAL.png` | Overview sheet of the full asset system |

Note on sizes: the 80 x 31 file is Drukwerkdeal's 25 x 74 mm sticker template (net size plus 3 mm bleed). Their uploader rejects net-size files for the Kleine stickers product, so any new sticker size must be built at net + 3 mm per side, portrait as the product names it; the templates are linked on the product page's Aanleveren tab.

## Colors

| Name | Hex |
|------|-----|
| Space Black | `#040406` |
| Signal Orange | `#F96118` |
| Off White | `#F7F7F4` |

## Production rules (from the guide)

Never redraw or alter the mesh geometry, the orange terminal, or the wordmark.
Production assets are extracted from these files, not reconstructed.

Extraction method used for the site assets (MESHSAT-727):

```bash
pdfimages -png MeshSat_sticker_80x31mm_EXACT.pdf out   # emits RGB + smask pairs
# composite each RGB image with its smask as the alpha channel (Pillow: putalpha)
```

The brand guide PDF additionally embeds: light and monochrome lockup variants (1222x267),
the 512x512 app tile, and a 1200x630 Open Graph link card.

Derived production assets live in `site/static/` (favicon.svg, apple-touch-icon.png,
images/meshsat-mark-{dark,light}.png, images/og-image.jpg, images/logo.{png,svg}) and
`docs/public/` (favicon.svg, apple-touch-icon.png, logo-{dark,light}.png, logo.svg).
