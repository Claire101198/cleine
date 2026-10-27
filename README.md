# BPAC Industrial Control Service — Website

A responsive, SEO-friendly marketing website for **BPAC Industrial Control Service**,
a Philippine-based electrical engineering, industrial automation, and control
systems company. Built with React, Vite, TypeScript, and Tailwind CSS.

---

## 1. Installation

Requires [Node.js](https://nodejs.org/) 18 or later.

```bash
npm install
npm run dev
```

The dev server prints a local URL (typically `http://localhost:5173`).

## 2. Production build

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with:

```bash
npm run preview
```

## 3. Deploying to GitHub Pages

This repo is already set up for **project-page** deployment
(`https://<your-username>.github.io/<repo-name>/`) via the `gh-pages` package.

1. Push this project to a new GitHub repository.
2. In `vite.config.ts`, set `base` to match your repository name:
   ```ts
   base: '/your-repo-name/',
   ```
   (If you're deploying to a *user/organization* page — `https://<user>.github.io/` —
   or to a custom domain, set `base: '/'` instead.)
3. Run:
   ```bash
   npm run deploy
   ```
   This builds the site and pushes `dist/` to a `gh-pages` branch.
4. In your repo's **Settings → Pages**, set the source branch to `gh-pages`.

Any static host (Netlify, Vercel, Cloudflare Pages, etc.) also works — just
point it at `npm run build` and serve the `dist/` folder.

## 4. Environment variables

Copy `.env.example` to `.env` to connect the contact form to a real email
service (Formspree, EmailJS, or a custom endpoint). See section 6 below.
**Without this step, the form validates correctly but does not send anywhere**
— it tells the visitor plainly rather than pretending to submit.

```bash
cp .env.example .env
```

---

## 5. Project structure

```
src/
├── components/     # Reusable UI: Navbar, Footer, ServiceCard, ContactForm, ...
├── sections/        # Page sections assembled from components: Hero, AboutSection, ...
├── data/            # All business content lives here (single source of truth)
├── assets/          # Logo, team photos, service/project photography, certificates
├── utils/           # Icon mapping helper
├── App.tsx          # Assembles all sections in order
├── main.tsx         # React entry point
└── index.css        # Tailwind + design tokens (colors, blueprint accents)
```

---

## 6. Customization guide

| To change...                          | Edit...                                              |
|----------------------------------------|-------------------------------------------------------|
| Logo                                   | `src/assets/logo/blink-logo.png` (swap the file, keep the name, or update the import in `Navbar.tsx` / `Footer.tsx`) |
| Team photos                            | `src/assets/team/*.jpg` and `src/data/team.ts`         |
| Certificate images                     | `src/assets/certificates/*` and `src/data/certifications.ts` |
| Colors                                 | `tailwind.config.js` → `theme.extend.colors` (navy / steel / cyan / amber) |
| Contact information                    | `src/data/company.ts` → `contact` object               |
| Services, capabilities, values, team roles | `src/data/company.ts`                              |
| Email / form integration               | `.env` (see `.env.example`) and `src/components/ContactForm.tsx` |
| SEO title / description / structured data | `index.html`                                       |
| Favicon                                | `public/favicon.svg`                                   |

All business copy (services, mission, vision, core values, team bios, contact
details) is centralized in `src/data/company.ts`, `src/data/team.ts`, and
`src/data/certifications.ts` so it only needs to be updated in one place.

### Adding real project photos

Real panel/installation photography supplied for BPAC is already in
`src/assets/services/` and `src/assets/hero/`, wired up in
`src/data/photos.ts`. Add more images to those folders and reference them
the same way to expand the gallery or swap a service's featured photo.

---

## 7. Quality checklist

- [x] Responsive from 375px up to 1920px, no horizontal scrolling
- [x] Mobile hamburger navigation + sticky mobile "Call / Request a Quote" bar
- [x] Keyboard-navigable, visible focus states, semantic HTML, form labels
- [x] `robots.txt`, `sitemap.xml` (update the domain once live), Open Graph tags,
      `LocalBusiness`/`ProfessionalService` structured data
- [x] Client-side form validation; honest "not connected yet" state until an
      email service is configured
- [x] Respects `prefers-reduced-motion`
- [x] No invented clients, projects, revenue, certifications, addresses, or
      statistics beyond what was supplied
- [ ] Run `npm install` and `npm run build` to confirm a clean production build

---

## 8. Content source of truth

All content follows the BPAC Industrial Control Service business profile
provided for this build (services, team, mission/vision/values, licenses).
Where information wasn't supplied (e.g. a live domain), the code leaves a
clearly labeled placeholder or TODO comment rather than inventing one.
