# Career Guidance

An English-language student portal with interactive education pathways, an engineering branch comparison, exam guidance, saved plans and email/password accounts.

## Local development

Use Node 22.13 or later. Install with `npm ci`, build with `npm run build`, and apply the SQL files in `drizzle/` in order to the local D1 database. Then run `npm run dev`. The Sites starter README covers the exact D1 commands. On this Windows machine npm's shell shim was unreliable; the equivalent working command is `node "C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js" run dev`.

## Accounts

Passwords use salted scrypt (N=16384, r=8, p=5). Sessions are random server-stored tokens, hashed in the database, with HttpOnly and SameSite cookies and Secure cookies over HTTPS. Account writes check origin. Authentication has per-email and per-IP rate limits. Accounts can save a plan, rotate a password and delete their records. Email ownership is deliberately unverified; Google login and account recovery are not implemented. No account data is placed in browser localStorage.

Run `node tests/api-smoke.mjs` against the local preview on port 5173. It creates a temporary account and checks registration, sessions, CSRF rejection, plan persistence, password rotation and deletion. Never run this test against production with real student data.

## WhatsApp automatic bot: implemented, not connected

The integration is disabled by default. It does not send messages in this preview. Students can already preview, copy and download their selected path and history.

Before activation, set up a Meta developer app with WhatsApp Business Platform and a registered business number. A bot uses a number too; it does not need a person answering. Configure these runtime variables using the hosting provider's secret settings, never browser code or Git:

- WHATSAPP_ENABLED: true only after setup and testing
- WHATSAPP_BUSINESS_NUMBER: registered number, country code and digits only
- WHATSAPP_PHONE_NUMBER_ID: Meta phone-number ID
- WHATSAPP_ACCESS_TOKEN: secret with the required messaging permission
- WHATSAPP_APP_SECRET: secret used to verify webhook signatures
- WHATSAPP_VERIFY_TOKEN: a strong secret chosen for webhook verification
- WHATSAPP_GRAPH_VERSION: supported version in the form vNN.N, selected from current Meta documentation

Use `/api/whatsapp` as the webhook callback and subscribe to messages. It must be reachable by Meta: the current owner-private Site access gate prevents external webhook access. Configure the appropriate audience only when ready for public launch; don't enable the bot while that gate is in place.

When configured, the interface enables Get connected. A signed-in student reviews the exact plan preview and explicitly agrees to share it. The server creates a random 24-hour plan code and a WhatsApp deep link. The student sends the code themselves. A signed Meta webhook resolves the code, binds it to the first sender, and replies automatically with the chosen path, branch, up to 12 recent selection labels and official resources. Passwords and account email are excluded. A fresh connection is required when the plan changes. This is a deterministic resource bot, not an AI counselling service.

Plan snapshots expire after 24 hours; expired rows are cleaned on subsequent connection or webhook requests. Duplicate message IDs are suppressed for 24 hours. Delivery failures request a webhook retry. This uses a lightweight idempotency guard, not a durable queue: a crash between sending and recording completion can leave an uncertain delivery. Add an outbox/queue with delivery reconciliation before high-volume use. Automatic delivery has not been tested with a live Meta account because credentials are not connected.

## Launch preparation

The hosted first version is private. Add the project owner's contact email, finalise the privacy/terms notice and the appropriate process for younger students before enrolling real students publicly. Email verification and forgotten-password recovery remain coming soon as requested. This is independent introductory guidance, not an official admissions or eligibility service.

The catalogue provides national routes plus AP/Telangana examples, not every Indian programme or state entrance exam. 2026 examples must not be presented as future-year eligibility. Check official bulletins when adding dates, fees, detailed category rules or branch mappings. Career examples are illustrative, not placement guarantees.

## Official sources used for core rules

- JEE Main: https://jeemain.nta.nic.in/information-bulletin/
- JEE Advanced: https://jeeadv.ac.in/eligibility.html
- IIT admission criteria: https://jeeadv.ac.in/admission_criteria.html
- AP ECET: https://cets.apsche.ap.gov.in/ECET/PDF/APECET2026_InstructionBooklet_V6.pdf
- DGT trade training: https://www.dgt.gov.in/en/CTS
- NEET: https://neet.nta.nic.in/admission-bulletin/
- GATE example rules: https://gate2026.iitg.ac.in/eligibility-criteria.html
- WhatsApp API: https://www.postman.com/meta/whatsapp-business-platform/documentation/wlk6lh4/whatsapp-cloud-api
- Password storage: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html

## Simplified student interface and PDF layout

Public routes: /, /login, /register, /terms and /privacy. The /student route requires a valid server session. Registered students open directly on the career tree. The navigation contains Career tree, B.Tech branches, Exams and My plan. Login, registration, account controls and saved plans use the existing backend.

The tree uses a narrow vertical spine, numbered stages and compact choices. The selected option is highlighted; siblings turn black and remain selectable. Changing an earlier choice removes its dependent choices and resets preparation status. The branch reference and comparison table send students back to the tree to make selections. No duplicate route-selection interface remains.

Removed oversized slogans, decorative card icons, presentation mode, the interest questionnaire, dashboard statistic cards, sample WhatsApp conversations, repeated calls to action and text-export controls. WhatsApp remains available when configured, with an explicit plan preview and sharing consent. Otherwise, My plan shows a single Coming soon label. Google sign-in and verification/recovery status appear under Other sign-in options on the account pages.

View PDF / Print opens an on-screen preview of the same document used by browser printing. The report has four sections with explicit print section breaks: selected route and career preparation; stage requirements; entrance routes and application documents; official resources and preparation checklist. The selected route is a numbered, connected diagram. Requirements and entrance options use tables with repeating print headers and rows kept together where possible. Source numbers link to a directory of readable URLs. Long sections may flow over more than one page.

Every current selected stage remains in the report. Superseded history entries, account details and repeated explanatory paragraphs are excluded. Selection history remains available under My plan and in the consented WhatsApp connection preview. Incomplete routes are marked as drafts. Save plan persists current edits; printing includes the current workspace even when not saved.

The site and PDF use a restrained layout, system fonts, simple borders and compact spacing. The report stays legible without printing background colours. Source changes only: no automated checks, builds, browser QA or print rendering were run, following the user's request to review manually. The local preview is the current handoff; publication remains incomplete.

## Restored branching map

The tree now uses a spatial, top-to-bottom diagram with curved SVG connections from the selected parent to every next option. Purple paths and selected nodes trace the current route; alternatives turn black. A selected career endpoint is green. Numbered level labels identify study route, subjects, degree, branch and career. The cards have brief course labels, meaningful icons, connection points and a small raised edge rather than the former form-like row layout.

The map fits available desktop width, supports zoom and horizontal scrolling, and preserves readable minimum scaling on smaller screens. The next unselected level is centred when the path changes; the final chosen career is centred on completion. Hovering or focusing an option shows its description below the map. Selection, reset, save and the existing PDF report remain connected to the same plan data.

This is a source-only local update. No automatic browser checks, builds or tests were run, as requested by the user.

## Student-page loading fix

The branching map's nested SVG rendering contained mismatched callback/JSX closing syntax, preventing the StudentPortal module from loading. Corrected the closures and expanded that rendering block for readability. The existing development-server error output was read to diagnose the failure; no automated tests or browser checks were run. No account, session, or saved-plan data was changed.


## Navigation, profile, resources and report update — 18 October 2026

The student navbar now uses a custom SVG Career Guidance mark and a unified navigation bar. Lato is the body font; Libre Baskerville is used for the wordmark and selected headings, with local system fallbacks. The same mark is used on the welcome/login/register pages and as the favicon. The home icon opens exactly Profile and Log out; the adjacent settings button opens Settings. Views have URL fragments so refresh and browser navigation preserve the selected page while in-page changes keep unsaved plan edits.

Profile shows the account email (read-only), current study route, selected career, preparation status and editable admission region. Saving persists the existing plan; no new personal fields are collected. Settings uses the existing password-change/account-deletion endpoints and includes a functional history-clearing action that preserves the current route and checklist. Clearing history also saves pending plan edits, as explained in its dialog. Upcoming sign-in methods remain clearly labelled.

Study resources replaces the B.Tech-only section. It covers all study groups represented in the catalogue: school subjects, diploma and trades, engineering branches, science and healthcare, business and humanities, law and design, postgraduate study and work. Search and category filtering are available. Entry/preparation guidance and existing official links are expanded per course; generic career links are labelled as such, not presented as exact course admission notices.

The branching tree no longer has zoom, fit or fullscreen/presentation controls. Automatic sizing and horizontal navigation remain for wide option sets. A right-hand panel displays only the current selected route as a single downward tree; it moves below the map on small screens.

The report preview is wider and switches between Route, Requirements, Applications and Resources without nesting a scrolling document pane. Print CSS shows every section even if hidden in preview and removes mandatory section page breaks to use fewer pages. Full selected-route requirements and links remain in the printed guide. Long content can still require normal page scrolling and multiple printed pages.

No automated checks, build, browser testing or PDF rendering were run, following the user's manual-review preference. These are local source changes; publication remains incomplete.


## Decision cards with progressive disclosure

The active tree level now uses full-width text within larger responsive cards. Each option explains why a student might choose it and two practical benefits. The guidance covers study routes, subjects, engineering branches and career destinations; it does not promise admission, jobs or salaries.

After selection, that level collapses to compact name buttons. Clicking a previous name reopens the level's full option cards, with the current choice marked. Later levels are temporarily hidden while reviewing, but the saved/current route is unchanged until a different option is chosen. Keeping the same choice restores the current path. Changing an earlier choice continues to reset dependent selections through the existing plan handler.

The next active heading receives focus and scrolls into view after a choice or review action. This moves completed stages above the visible area without deleting them. Reduced-motion preferences are respected. The right-hand selected route remains in place on desktop and below the choices on smaller screens.

The diagram now uses soft rounded cards, narrow connecting lines without arrowheads, navy text and muted teal/green accents. There is no scaled canvas or horizontal scrolling for the choice cards, so descriptions are not clipped. Save, PDF, profile and resource features are unchanged.

No automated tests, build or browser/print verification were run, following the user's manual-review preference.

## Restored tree and resource folders — 18 October 2026

Restored the earlier spatial branching tree with curved SVG connectors and visible sibling choices. The accepted navy/teal palette and right-hand selected route are retained. Other options turn charcoal after selection and remain selectable. Option descriptions, why-to-choose guidance and benefits appear below the map on focus/hover and after selection. Automatic sizing remains; no zoom or fullscreen controls are exposed. This supersedes the progressive decision-card layout above.

The student navbar now uses a simple background highlight instead of an underline. A profile icon opens Profile, Settings and Log out; the separate settings icon has been removed.

Study resources now uses folder navigation with breadcrumbs, back navigation and scoped search. B.Tech contains folders for all eight catalogue branches and separate admissions folders. Branch folders show subjects, existing official learning links, requirements, preparation, career directions, a project and further-study guidance. Other study areas contain their own course/subject folders. NPTEL links remain general course-browsing resources, not fabricated individual course links.

No automated tests, build or browser/PDF verification were run, as requested. Local source changes only; the existing preview remains the review target.

## Complete light-green theme and My Plan — 18 October 2026

Added app/theme.css as the shared theme after the existing layout stylesheet. The welcome, account entry, student navigation, tree, study folders, exams, profile, settings, dialogs and document preview use pale sage backgrounds, light cards, green borders and forest-green text/buttons. Error and destructive-action styles retain their meaning. Existing responsive layout and the restored curved tree are preserved.

Refined the shared Career Guidance SVG into a green, inset-bordered mark with a branching stem and leaf. Updated the matching favicon and serif wordmark styling. No bitmap or external image assets were required.

Extracted My Plan into components/MyPlan.tsx. It presents the current career or incomplete route, region, save status, selected-route timeline, real checklist progress, relevant practice project, study-resource navigation and a printable-guide card. Existing save, edit, task, history and WhatsApp connection handlers remain connected to the same plan state. Preparation counts are based on checklist completion, not invented career-completion percentages.

The report opens with a 2.4-second typewriter illustration: paper feeds, the carriage moves and the short title types in. It can be skipped and is disabled for reduced-motion preferences. It never blocks the Print / Save PDF action. Print styles hide the animation and retain every report section, including the full route, stage requirements, applications and resources. No external fonts or packages were added; existing Lato and Libre Baskerville remain in use.

No automated tests, builds, browser checks or PDF rendering were run, following the user's manual-review preference. Changes are local and available through the existing preview server.

### Green-theme refinement

The print animation is now a brief floating corner preview, so its appearance and dismissal do not move the report. Skipping it, or its automatic completion while focused, returns focus to the report section controls. Print remains available immediately; the animation never enters the PDF. Reduced-motion preferences suppress it.

My Plan headings now use direct labels (Selected path, Preparation checklist, Your career guide), and route metadata has larger, darker text. Small-screen navigation uses four equal columns with consistent tap areas. Terms and Privacy use the shared logo header and footer while preserving their policy content. No automated or browser verification was performed.

## Student introduction and one-time career plan — 19 October 2026

This flow supersedes the earlier freely editable career planner. After sign-in, a student records current class/course, course year where relevant, up to three interests, up to five enjoyed subjects and admission region. The two-step introduction includes an exclusive unsure choice. Profile details use validated options and are persisted in the existing plan JSON; no database migration is needed.

New students choose their full route in the branching tree and use Finish and save my route. The server requires a complete destination and valid student profile, then sets a server-controlled lockedAt timestamp. After finishing, My Plan is the default home and navigation contains My Plan, Resources and Exams. Tree links, reset and route-edit controls are unavailable for locked accounts, including through older URL fragments. Profile and Settings remain available. A backend guard rejects changes to a locked path/branch, preserves its lock and protects simultaneous writes with a conditional update.

Existing saved complete routes from the previous data shape are preserved and treated as locked. Students add any missing profile details before their plan opens; this does not reset or replace their route. Incomplete saved drafts remain available to finish.

The full route, career preparation and every stage's requirements are shown on the first plan view. Start my tasks saves overviewSeen. Subsequent visits highlight the student's current study stage and show its concrete checklist with a next-task action. Progress is task completion only; qualifications and career achievement are not inferred. Earlier/future stage guidance remains readable. Updating profile details moves the task focus without changing the saved career route. Where current studies do not fit the route, explanatory guidance appears instead of pretending a stage is complete. Enjoyed subjects and interests inform practice suggestions.

Resource folders include shortcuts for the saved path. Exams default to relevant routes with an All exams view. The printable report retains the complete selected journey, current study details, requirements, admission guidance, official resources and tasks for every stage. The typewriter introduction stays skippable and excluded from printing.

WhatsApp remains disabled until configured. Its connection action uses the persisted fixed route and explicit existing sharing consent. Profile answers are excluded from the bot snapshot. Login methods and account functions remain as before. Privacy text describes the additional profile storage and printed current-study information.

The user requested manual verification. No tests, builds, browser interactions, network smoke tests or PDF rendering were run for this update. Existing local preview is the intended review target; publication is not part of this iteration.

## Mobile layout, simpler My Plan and confirmed reset — 19 October 2026

This update supersedes the permanent no-reset restriction above. A saved route remains fixed during ordinary use, but students can now explicitly choose Reset career plan in My Plan or Settings. A confirmation explains that the route, task progress and selection history will be removed while the account, saved study details and region remain. The server validates the saved revision, resets to a Class 10 draft, and invalidates pending bot connection codes in an atomic operation. No account or existing plan was reset during implementation.

My Plan now has three tabs: Tasks, My route and Requirements. Only one panel is visible. The first visit opens the complete route; Tasks focuses on the student's current stage. Task explanations, career steps and selection history expand on request. Study resources, printing and reset remain available without repeating large cards.

At phone widths, the career chooser displays readable cards for only the current decision, with why-to-choose guidance and benefits. Completed selections become a compact route. Earlier choices can be reviewed before finishing. The curved desktop tree and right-hand selected route remain. The large introductory study/interests panel is now a collapsed starting-point summary. Shared mobile styles cover navigation, forms, resource folders, profile, settings, dialogs and report preview.

Opening the print guide displays a full-screen typewriter/printer scene for four seconds. It can be skipped, respects reduced motion, and is removed before printing. The report retains every selected stage, its requirements, applications, resources and task checklist. On phones, requirement and admission rows display as labelled cards; screen-only styles leave the printed tables intact.

Per the user's instruction, no automated tests, builds, browser checks, HTTP checks or PDF rendering were run. The local preview is for manual review; no publication was attempted.

## My Next Step — college demonstration iteration

The current brief retains Career Guidance and provisionally uses ECE as the main demonstration example. The owner said the approved title may be career guidance on ECE; exact title and school-session details remain unconfirmed. No school records, participant counts, quotations, photographs or learning outcomes were invented.

Added Explore with six original paper/laptop activities: message encoding (ECE), instructions/logic, visual communication, fictional budgeting, observation planning and practical school wayfinding. Each activity has steps, a work record and a reflection. A single Save activity action persists the current plan and activity through the authenticated plan API. It is optional exploration, not a scored aptitude test or career prediction. Added a compact expandable comparison of all four Class 10 routes above the existing tree.

Plan JSON optionally stores validated exploration entries (at most six, bounded 1200-character work records and defined reflection choices). Existing plans remain valid. The server copies validated fields, includes records in ordinary saves, and preserves activities during a confirmed route reset. Exploration records are excluded from WhatsApp snapshots and included in the complete printable guide. No schema migration is needed.

Added public /project explaining all 16 college questions, ten viva questions, an ECE demonstration sequence, implemented versus future scope and required school evidence. public/project/college-presentation-guide.md is downloadable and includes a slide outline and manual rehearsal checklist. The project page is separate from the student workflow. Added responsive green layouts for activities, comparison and project page; the previous mobile tree, reset and four-second fullscreen print animation remain.

No automated tests, build, browser/HTTP checks, screenshots or PDF rendering were run per the user's instruction. No publication, user-data reset or messages to others were performed. Review the prototype manually before college presentation. External resources require internet; fully offline operation has not been verified.

## Focused Class 10 flow — Explore retired

Removed the optional Explore page and navigation item at the user's request. Profile setup now leads directly to the career tree and route comparison. The public welcome page, Project Overview, 16 answers, viva guide, demo sequence and downloadable presentation guide now describe Compare → Choose → Prepare → Print. ECE remains the proposed example, without a paper activity or aptitude assessment. The unused activity UI and styles were removed; mobile navigation returns to three items.

Previously saved activity data is retained for compatibility rather than silently deleted. Its validator and server preservation remain, but records are no longer displayed or printed. Privacy wording explains the retired data. No database mutations, automated checks, browser checks or build were performed.

## Detailed resource folders and focused controls

Added lib/resource-guides.ts and a shared ResourceGuidePanel for every existing resource folder. All eight engineering branches now have grouped foundations, core topics, advanced/elective examples and practical subjects, with specific skills and explanations of how they are developed. School combinations, diploma/trades, sciences/health, commerce/humanities, law/design and further-study/work folders have their own topic groups and skill guidance. Broad folders explicitly distinguish alternative programmes instead of presenting them as one combined syllabus.

Every folder uses three views: Subjects & skills, Admissions & next steps, and Learning links. Topic groups expand individually. Counts come from each folder's data. Search includes the detailed subjects and skills. Engineering topic names link to labelled NPTEL course searches, not fabricated individual course pages. Learning links distinguish official catalogues, historical model curricula and institution-specific examples. Mobile layouts have stacked content, wrapping labels and large controls.

Sources consulted: AICTE 2018 model engineering curricula volumes I/II, NPTEL course catalogue, CBSE 2026-27 subject curriculum, DGT trade curricula, NMC undergraduate curriculum, Indian Nursing Council programme guidelines, NID foundation programme, SWAYAM catalogue, University of Delhi B.Com curriculum, NLSIU law programme, ICAR agriculture curriculum and the dental regulations index. These support orientation, not a complete or universally applicable semester syllabus. Exact university/board subjects, elective choices and current admissions must be checked with the institution.

Removed the non-actionable WhatsApp placeholder and duplicate history panel from My Plan, and the duplicate email-verification notice from Profile. Existing Settings controls, future-sign-in status, saved history, account data, route reset and print functions remain. The retired Explore page was not restored.

No automated application checks, builds, browser QA or PDF rendering were performed per the user's preference. Source research was performed using official websites; this is not a claim of runtime verification or perfection.

## Clearer final choices after B.Tech branches — 21 October 2026

Replaced specific job titles following B.Tech branches with four broad, clear final choices:
1. Work and internships — develop projects, practical skills and interview preparation.
2. M.Tech / M.E. — further study in an engineering specialisation.
3. M.S. / Research — explore advanced study and research programmes.
4. MBA / Management — explore business and management studies.

Updated the action button from "Finish and save my route" to "Save my plan" across desktop and mobile tree views, leading into stage requirements, preparation tasks, official resources and the complete printable guide. Added CAT to official exams guidance for management pathways and mapped GATE to M.Tech and M.S. routes. Preserved legacy job nodes for backwards compatibility with existing saved student plans.
