# Photo viewer

The user requested a same-page photo popup with previous and next controls,
matching the portfolio's existing UI and the WattSnap team photos shown.

## Design

- Use a native modal dialog with a dimmed backdrop, the existing theme tokens,
  rounded borders, Geist typography, and simple icon buttons.
- Show the complete image with `object-fit: contain`, its caption, and its
  position in the current gallery. Fit within laptop and mobile viewports.
- Group team/event photos together. Keep homepage galleries, awards,
  certificates, designs, and each project screen set in their own groups.
- Keep the screen fan interaction and add an explicit full-size control.
- Previous/next buttons and arrow keys wrap through the current group.
- Close with Escape, the close button, or a click on the backdrop. Restore
  focus and page scrolling. Native dialog supplies background isolation.
- Use semantic photo buttons and delegated events so dynamically rendered
  homepage galleries continue to work. No new production dependencies.

## Implementation boundary

Use one shared viewer module and the current stylesheet. Replace the old
homepage-only lightbox. Preserve image crops on the page and show uncropped
images in the viewer. Keep captions as plain text in the viewer.

## Verification

Check the original team-photo click before the change, then verify opening,
grouped navigation, wraparound, keyboard controls, focus restoration,
backdrop dismissal, theme colors, screenshot expansion, and viewport fit
in a headless browser. Run the existing Node test suite and inspect screenshots.
