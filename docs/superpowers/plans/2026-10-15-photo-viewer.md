# Photo Viewer Implementation Plan

**Goal:** Open portfolio photos in a same-page, themed popup with previous and next controls.

**Architecture:** A shared native dialog module handles delegated photo buttons
and programmatic screen-set opening. Existing renderers supply gallery groups,
source images, and captions. CSS uses the portfolio's existing design tokens.

**Tech stack:** HTML, CSS, browser ES modules, native dialog.

## Global constraints

- No new production dependencies.
- Preserve existing on-page image crops and screen fan navigation.
- Match the existing light and dark theme tokens.
- Contain the complete image inside the viewport.

## Tasks

- [x] Confirm the existing team-photo click does not open a viewer.
- [x] Add `js/logic/lightbox.mjs`: create the dialog once; delegate grouped
  photo clicks; expose `openLightbox(items, index, trigger)` for screen fans;
  update image/caption/count; wrap navigation; handle keyboard, dismissal,
  image failures, scroll lock, and focus restoration.
- [x] Update `js/logic/ui.js`: initialize the viewer on homepage and case studies;
  replace inline photo handlers with semantic grouped buttons; wrap team/event
  photos; add a full-size button opening the active screen set.
- [x] Remove the old lightbox HTML from `htmlfiles/index.html` and add viewer
  styles to `css/style.css`, including mobile and reduced-motion behavior.
- [x] Verify all specified interactions in the rendered app at laptop and
  mobile sizes, run `node --test`, and review the final diff.

## Verification results

- The original team-photo click failed the same-page dialog assertion before
  implementation and passed afterward.
- 77 browser assertions passed in headless Edge, covering 1366×768, 1280×720,
  1024×768, 390×844, 360×640, and 844×390 viewports; light and dark themes;
  grouped navigation and wraparound; keyboard operation; focus restoration;
  backdrop dismissal; screen expansion; and dynamic homepage galleries.
- Additional checks passed for failed-image feedback, recovery through next
  navigation, reverse tab order, and background scroll locking.
- All seven case studies rendered; all nine screen sets opened and navigated.
  ARPS's three team/event photos also opened at the selected index.
- Visually inspected laptop, mobile, light-theme, and project-screen captures.
- Existing Node tests: 4 passed. JavaScript syntax and `git diff --check` passed.
- Browser verification scripts and tooling are temporary; no production
  dependencies were added.
- Independent code review found one minor accessibility issue: generic photo
  button labels hid their image descriptions. Removed those overrides so
  each photo's descriptive alt text supplies its button name.
