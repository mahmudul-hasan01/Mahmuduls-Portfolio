# Mahmudul Hasan — Portfolio

A single-codebase developer portfolio built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **GSAP + ScrollTrigger**, and **Lenis** for smooth scrolling. Content is sourced from Mahmudul Hasan's CV (`data/profile.ts`, `data/projects.ts`).

## Stack

- **Next.js 14** — App Router, `next/font` for self-hosted Google Fonts
- **Tailwind CSS** — design tokens in `tailwind.config.ts` (paper / ink / muted / line / dark)
- **GSAP + ScrollTrigger** — all scroll-driven animation
- **Lenis** — smooth scroll, wired into GSAP's ticker so ScrollTrigger stays in sync

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run start
```

## Pages

- `/` — hero, about teaser, **skills**, selected work, scroll reveal, contact CTA
- `/about` — full bio + real portrait, skills, experience/education/certifications/
  languages/soft-skills, and a capabilities pitch
- `/work` — filterable project archive (All / SaaS / Marketplace / E-commerce /
  Interactive — tabs are generated from real project categories), list/grid
  view toggle, cursor-following hover preview

## Navigation

The navbar is **static** (scrolls away with the page, not fixed). Two ways to
reach the nav after that:

1. On small screens, the navbar's own hamburger button opens the full-screen
   `MobileMenu` overlay.
2. On **every screen size**, once you scroll past ~420px a floating round
   button fades in at the bottom-right (`ScrollMenuButton.tsx`, mounted once
   in `app/layout.tsx`) and opens the same overlay — so navigation stays
   reachable everywhere, on any device, after the top nav scrolls out of view.

## Structure

```
app/
  layout.tsx        Root layout, loads fonts, wraps app in <SmoothScroll>,
                     mounts the site-wide <ScrollMenuButton>
  page.tsx           Home page, composes all home sections
  about/page.tsx      About page
  work/page.tsx        Work / archive page
  globals.css           Base styles, marquee keyframes, grain texture
components/
  Navbar.tsx           Static (non-fixed) header + hamburger trigger
  MobileMenu.tsx         Full-screen nav overlay, GSAP slide/stagger
  ScrollMenuButton.tsx     Floating menu button, fades in on scroll (all
                           breakpoints), opens its own MobileMenu instance
  Hero.tsx                Split-word headline animation + scroll-velocity skew
                           distortion + SVG feTurbulence/feDisplacementMap
                           "resolve out of noise" effect on the real portrait +
                           looping details marquee (role/location from
                           data/profile.ts)
  About.tsx                Homepage teaser: scroll-scrubbed line reveal + CTA
  AboutIntro.tsx             /about hero: name, bio, real portrait + stat card
  Skills.tsx                  Categorized skill chips (Frontend / Backend /
                               Database / Tools), scroll-revealed
  Experience.tsx               /about: work history timeline + education,
                                certifications, languages, soft skills,
                                extracurricular — all from data/profile.ts
  SelectedWork.tsx               Homepage's project table; hover preview
                                 follows the cursor (GSAP quickTo), shows
                                 tech-stack chips
  WorkExplorer.tsx                /work page: filter tabs, list/grid toggle,
                                   full archive, hover preview
  ScrollReveal.tsx                 Pinned panels per featured project: intro
                                    text fades out while a color panel scales
                                    from a small rounded frame to fullscreen
                                    with a centered title
  Contact.tsx                       Dark CTA section with real email/phone/
                                     location, grain overlay, reveal
  Footer.tsx                         Contact links + infinite name marquee
  SmoothScroll.tsx                    Lenis provider, synced with GSAP ticker
  Cursor.tsx                           Custom ring + dot cursor (desktop only)
lib/
  gsap.ts               Central gsap + ScrollTrigger registration
data/
  profile.ts             Name, role, contact, bio, experience, education,
                          certifications, languages, soft skills, skill groups
  projects.ts             The four real CV projects (Sarmeadors, Tag Growth,
                           EZ Book Solution, Redefine Gaming) with tech stack,
                           features, and category-based filter tab helpers
public/images/
  mahmudul-portrait.jpg    Real portrait extracted from the CV, used in the
                            Hero and the About page
```

## Known placeholders to fill in

- **Project live links** — `data/projects.ts` has `link: "#"` for each
  project. The CV's "Live-Link" text didn't expose the underlying URLs, so
  swap these in once you have them.

## Customizing

- **Personal info**: edit `data/profile.ts` (name, role, contact, bio,
  experience, education, certifications, languages, skills) — most
  components pull from here, so it's the single source of truth.
- **Projects**: edit `data/projects.ts`. Categories drive the `/work` filter
  tabs automatically (`filterTabs` + `countByTag`).
- **Colors**: `tailwind.config.ts` → `theme.extend.colors`.
- **Fonts**: `app/layout.tsx` — currently Instrument Serif (display),
  Inter (body), Space Grotesk (headings/marquee), JetBrains Mono
  (labels/eyebrows). Swap for any Google Font.
- **Portrait**: `public/images/mahmudul-portrait.jpg` is the real photo
  extracted from the CV, used in `Hero.tsx` and `AboutIntro.tsx`. The
  work-preview cards still use color-swatch placeholders — drop project
  screenshots into `public/` and swap the markup in `SelectedWork.tsx` /
  `WorkExplorer.tsx` / `ScrollReveal.tsx` if you'd rather show real images.

## Notes on the motion system

- `SmoothScroll.tsx` initializes Lenis once at the root and dispatches a
  `lenis-scroll` window event with the current scroll velocity, which
  `Hero.tsx` listens to for its ambient skew effect.
- Every scroll-triggered animation lives inside `gsap.context()` + a cleanup
  `ctx.revert()` in the component's `useEffect` return, so it's safe under
  React Strict Mode and on route change.
- `prefers-reduced-motion` is respected globally via `globals.css`.
