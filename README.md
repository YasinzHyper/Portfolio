# Mohammed Yasin Zuhayr — Portfolio

A personal portfolio built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4. The design combines a dark violet/teal palette, a CSS 3D crystal hero, interactive project previews, and a scroll-driven career timeline.

## Local development

Use Node.js 20 and npm, matching the deployment workflow.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Development runs without the `/Portfolio` prefix.

## Validate and preview the static build

```bash
npm run typecheck
npm run build
npm run preview
```

Open [http://127.0.0.1:4173/Portfolio/](http://127.0.0.1:4173/Portfolio/). The preview serves the generated `out/` directory with the production URL prefix; rebuild after changing source files. Use this preview command for the static export instead of `npm run start`.

## What is implemented

- Hero with pointer-responsive crystal, orbital elements, company wordmarks, and social links.
- Ambient particle connections and drifting background gradients, with shared pause controls and reduced-motion support.
- Featured AlgoAce, schemafit, and ossready previews, plus three additional projects and project-detail dialogs.
- AlgoAce sample topics, reasoning explanations, actual screenshot gallery, preview-only light/dark switching, and architecture view.
- schemafit provider selection and animated schema flow; ossready scaffold simulation.
- Filterable skills with technology logos and connections that select the relevant project.
- Experience defaults to the timeline, with an animated scroll-following dot and expandable roles. Career focus is an optional alternate view.
- Education, achievements, and community content alongside the career history.
- Contact purpose tabs, email links, copy-email action, downloadable contact card, and social/resume links.

Project previews are illustrative client-side interactions. Contact actions use email and profile links; no contact backend is required.

## Content and implementation locations

| Location | Purpose |
| --- | --- |
| `src/app/page.tsx` | Section order |
| `src/app/layout.tsx` | Metadata, providers, header, and footer |
| `src/app/globals.css` | Shared colors, typography, layout, and responsive styles |
| `src/components/sections/` | Hero, about, projects, skills, experience, and contact content |
| `src/components/portfolio/` | Project previews, dialogs, shared navigation, and component styles |
| `src/components/portfolio/motion-provider.tsx` | Shared pause preference and reduced-motion handling |
| `src/components/portfolio/ambient-background.tsx` | Canvas particles and ambient background |
| `src/components/portfolio/hero.css`, `motion.css` | Crystal, orbit, and background animations |
| `src/data/portfolio-skills.json` | Skill categories, logos, and project connections |
| `src/data/portfolio-brands.json` | Brand asset metadata |
| `src/lib/portfolio-assets.ts` | Public asset URL helper and contact/profile links |
| `public/portfolio/logos/` | Local company, technology, and social SVG logos |
| `public/portfolio/brand-manifest.json` | Logo sources, licenses, and attribution metadata |
| `public/portfolio/screenshots/` | Supplied AlgoAce interface screenshots |
| `public/portfolio/yasin.vcf` | Downloadable contact card |

Use `assetPath()` for local public assets so URLs work both in development and under the production prefix. Motion controls share one state; decorative animations respect reduced motion, and the background stops rendering while the page is hidden.

## GitHub Pages

`next.config.ts` enables static export, trailing slashes, and unoptimized images. Production assets and routes use `/Portfolio`; `npm run build` writes the deployable site to `out/`.

The existing `.github/workflows/deploy.yml` builds and deploys `out/` on pushes to the **`Nextjs`** branch, or through manual workflow dispatch. The public address is [yasinzhyper.github.io/Portfolio/](https://yasinzhyper.github.io/Portfolio/).
