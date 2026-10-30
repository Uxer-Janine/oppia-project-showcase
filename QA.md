# Publication checks — 29 October 2026

- Source reviewed: Topic Page Redesign research report; learning-journey account; homepage SEO audit; engagement analysis; donor-recognition proposal; original badge and certificate templates. Nested folders were sampled rather than exhaustively reviewed.
- Authorship across all five contribution areas confirmed by Janine. Study dates and sample size match the report. Proposed recommendations, historical tool findings and qualitative observations are distinguished from verified outcomes.
- Seven original images visually inspected. No identifiable children, participant records, real donor names or confidential documents are included. No video containing learners is embedded.
- Build and static checks pass: section order, unique anchors, accessible image text, dimensions, local assets, safe external links, privacy checks and evidence limitations.
- Fourteen unique external link destinations returned HTTP 200. This verifies reachability, not anonymous access to every Google Drive item. Source sharing permissions were not changed.
- Chrome: desktop, 390px mobile and 768px tablet reviewed. No horizontal document overflow at tested widths.
- All seven image viewers open by keyboard; Escape restores focus and page scrolling. Communication gallery next-image navigation, zoom and X-close checked. Mobile certificate viewer checked.
- Existing Outreachy portfolio repositories were not modified. The showcase has no third-party runtime dependencies, tracking scripts or remote font requests.

The GitHub Pages workflow independently repeats the build and static checks before deploying.

## Community video follow-up — 30 October 2026

- The initial no-video state above has been superseded by the permission-cleared Of Course Challenge feature.
- Supplied files identified as children, parents/teachers and advocates compilations; only the children's original is included.
- Public portfolio permission for every identifiable child's images and voice explicitly confirmed by Janine. No children's names or identifying descriptions added to the page.
- Original 78,429,954-byte H.264/AAC MP4 retained byte for byte; SHA-256 recorded in asset provenance. Full video stream decodes successfully. Poster extracted from the original at five seconds.
- Chrome desktop and 390px viewport: original plays, pauses and seeks; native controls and inline playback work. The page starts paused at time zero with `preload="none"` and no autoplay. No horizontal overflow at the tested mobile width.
- Local preview server supports byte ranges so seeking and tail metadata can be tested without changing the MP4. Initial and suffix range responses verified as HTTP 206.
- Existing page HTML is byte-equivalent after removing the new feature (apart from platform line endings). Existing CSS is an unchanged prefix; new styles are scoped to `.community-video`. The existing lightbox JavaScript is unchanged.
- Existing build/static checks pass, including the new video-source/control settings checks. Live playback and deployment are checked separately after publication.
