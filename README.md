# Karan Patel: Portfolio (INFO-3130, Assignment 1)

A static portfolio site written from scratch in HTML, CSS and JavaScript. No frameworks and no build step, so GitHub Pages can serve it as-is.

## Folder structure

```
portfolio/
├── index.html                Home (hero, selected work, skills, experience)
├── projects.html             All projects, with a JS filter
├── case-study.html           Case study hub (links to the three below)
├── case-study-facebook.html  Facebook UX redesign (team project, real content)
├── case-study-bems.html      AI-BEMS ergonomics dashboard (solo, real content)
├── case-study-course-manager.html  Course Manager App (technical case study, real content)
├── about.html                Story, full skills, experience, education
├── 404.html              Custom "page not found"
├── robots.txt            Search engine rules
├── sitemap.xml           List of pages for search engines
├── .nojekyll             Tells GitHub Pages to skip Jekyll processing
├── css/
│   └── styles.css        Design tokens, layout and components
├── js/
│   └── main.js           Mobile menu, project filter, case study index, copy email
└── assets/
    ├── Karan-Patel-Resume.pdf     ← YOU ADD THIS
    └── img/
        ├── favicon.svg, apple-touch-icon.png, og-image.png
        ├── project-*.svg          Project thumbnails (replace with real screenshots)
        └── case-study/            Put Figma exports here
```

## Before you deploy: checklist

Search the whole project for these and replace them (in VS Code: **Ctrl+Shift+F**, or **Ctrl+Shift+H** to replace across files).

| Search for | Replace with |
|---|---|
| `karan-xi` | Your GitHub username (appears in canonical URLs, sitemap, GitHub links) |
| `karan-patel-4053bb26a` | Your LinkedIn profile ID |
Also:

- [ ] Export your resume as a PDF and save it as `assets\img\Karan-Patel-Resume.pdf`. Fix "August 20206" on your resume first.
- [ ] If you host at `username.github.io/repo-name/` (a *project* site), also replace `.github.io/` with `.github.io/repo-name/` in `sitemap.xml`, `robots.txt` and the `<head>` of each page, and set `<base href="/repo-name/">` in `404.html`.
- [ ] Confirm the `portfolio` repo name in `projects.html` matches your real repository (the Course Manager App link already points at your real repo, `github.com/karan-xi/CourceManagerApp`).
- [ ] The Course Manager App case study is a **technical** case study (architecture, stack, deployment), not a UX process case study. If your assignment specifically requires a UX case study with research and testing, submit "Redesigning Facebook" or the AI-BEMS case study for that part instead.
- [ ] Replace the SVG project thumbnails with real screenshots when you have them (keep `width`, `height` and `alt`). The Facebook and AI-BEMS case studies already use your real wireframe and prototype screenshots; the Course Manager App case study uses illustrative diagrams built from its actual code, since the project has no screenshots.

## Preview locally

Open the folder in VS Code and use the **Live Server** extension, or run this in the project folder:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Deploy to GitHub Pages

1. **Create a GitHub repository.** Go to github.com → **New repository**.
   - For the cleanest URL, name it `karan-xi.github.io` (your site will be `https://karan-xi.github.io/`).
   - Any other name (for example `portfolio`) also works, and your site will be `https://karan-xi.github.io/portfolio/`.
   - Set it to **Public**. Do not add a README or .gitignore, since this project already has files.
2. **Finish the checklist above** and preview locally.
3. **Push the project.** In a terminal, inside the project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/karan-xi/REPO-NAME.git
   git push -u origin main
   ```
4. **Turn on Pages.** In the repository go to **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose **main** and **/ (root)**, then **Save**.
5. **Wait 1 to 2 minutes**, then refresh the Pages settings screen. It shows the live URL.
6. **Submit** that URL to the Assignment #1 Dropbox on eConestoga.

To publish changes later: `git add .`, `git commit -m "Describe the change"`, `git push`.

## Test before submitting

**Browsers:** open the live site in Chrome, Edge, Firefox and Safari (or Safari on an iPhone). Check the menu, project filter and case study contents in each.

**Responsive:** in Chrome DevTools press F12, then Ctrl+Shift+M, and check widths 390, 768 and 1440.

**Accessibility:**
- Press Tab through each page: every link and button should show a visible focus ring, and the "Skip to main content" link should appear first.
- Run Lighthouse (DevTools → Lighthouse) for Accessibility, SEO and Best Practices. Aim for 90+.
- Check the pages at <https://validator.w3.org/>.

**SEO:** after deploying, open `/sitemap.xml` and `/robots.txt` to confirm they load, and paste a page URL into a social preview tool to check the share image.

## Design notes (for your design brief)

- **Palette:** paper `#FAFAF7`, ink `#14171C`, muted `#5A616B`, line `#E6E6E1`, accent `#0F766E`, accent tint `#E6F4F1`. All text pairings meet WCAG AA.
- **Type:** Inter for text, JetBrains Mono for dates and tags only.
- **Layout:** 1120px max-width container, 8px spacing scale, CSS Grid and Flexbox, responsive breakpoints between 560px and 1000px.
- **Accessibility:** skip link, semantic landmarks, visible focus states, `aria-current` on the current page, labelled buttons and filters, `prefers-reduced-motion` support, and a site that works without JavaScript.
- **SEO:** unique title and description per page, canonical URLs, Open Graph and Twitter tags, JSON-LD Person data, sitemap, robots.txt and one `h1` per page.
