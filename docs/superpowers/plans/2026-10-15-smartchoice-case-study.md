# SmartChoice case study

## Goal and scope

Add SmartChoice to the existing portfolio case-study format using the user's
project write-up and screenshots. Attribute the role as Full-stack developer.
Keep the current project-card summary, responsive preview, reading time,
section tabs and full-size image viewer. Display all SmartChoice screenshots
directly in the article, grouped into student and counselor screens.

## Content boundaries

- Explain the course-selection problem and the intended support for students
  and guidance counselors at Saint Anthony's College.
- Include the general objective and three specific objectives under Overview.
- Cover student accounts, structured assessment, strand-based recommendations,
  course details, saved courses, counselor views, and CSV exports.
- Use the supplied PHP, JavaScript, CSS, Tailwind, MySQL, and VS Code stack.
- Do not invent timelines, validation results, a team size, or measured changes
  in course switching. Do not repeat unverified survey figures as results.
- The local implementation contains sample reporting data; distinguish the
  reporting interface from verified usage or assessment outcomes.

## Implementation

- [x] Add `CASE_STUDIES.smartchoice` to `js/logic/data.js`.
- [x] Add optional objectives rendering and reading-time support in
  `js/logic/ui.js`, preserving the existing layout for all other projects.
- [x] Add available original screen images under `images/smartchoice/` and
  connect them to student and counselor screen sets.
- [x] Verify the SmartChoice preview, all sections, role, objectives, screen
  navigation, image loading, full-size viewer, desktop/mobile layout, and
  existing case-study routes. Run the existing Node tests and diff checks.
- Publish through the established main/Vercel workflow after verification.

## Screen assets

The user supplied the original folder `SMARTCHOICE UI`. All 14 PNG files
were copied unchanged and verified by SHA-256 comparison. The student set
contains nine screens and the counselor set contains five. Survey figures
and sample report charts are identified as interface examples, not validation
results or verified adoption statistics.

## Verification

Browser checks passed at 320, 390, 768, and 1366 pixels, including all 14
original images, both screenshot groups, full-size navigation and wraparound,
and consistent reading time. All eight case studies render; other projects'
nine carousel screen sets open and navigate. The four existing Node tests, JavaScript syntax checks,
and `git diff --check` passed. Visual inspection and an independent code review
found no issues.

## Follow-up: display every screen

The user requested that all 14 UI screenshots be directly visible. SmartChoice
now opts into a two-column desktop and one-column mobile thumbnail grid.
Every image opens the shared popup at its own position in a single 14-image
gallery, including navigation between the student and counselor groups.
Existing case studies keep their carousels. Browser checks confirm every
thumbnail and full-size image loads, navigation wraps, focus returns to the
clicked thumbnail, and the page fits mobile and desktop widths.
