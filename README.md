# Anilkumar H J — Portfolio

My personal portfolio, built with **Angular 22** (standalone components, signals, zoneless) and prerendered to plain HTML at build time, so search engines and link previews see the full page.

Live site: https://anihani.github.io/my-portfolio/

## Run it

```bash
npm install
npm start
```

Open http://localhost:4200/.

## Change the content

Everything shown on the page (name, role, skills, jobs, awards, education, contact details) lives in one file:

`src/app/data/profile.ts`

Edit it and the page updates. The look is in `src/styles.css`; each section is a small component in `src/app/`. The site opens in dark mode by default; the toggle in the header switches to light and remembers the choice.

### Phone number and WhatsApp

The contact card has an **Email me** button first, then LinkedIn, GitHub and a **WhatsApp** button. The phone number stays hidden behind **Show number**, and the WhatsApp address is only built when the button is clicked, so your number is not in the page's HTML for bots to collect. The opening WhatsApp message is `whatsappMessage` in `src/app/data/profile.ts`. Note that the number itself is still in that file, so keep the repo private (or move the number out of it) if you want it fully off the internet.

### LinkedIn and résumé

`links.linkedin`, `links.github` and `links.resume` in `src/app/data/profile.ts` control the profile buttons in the hero and the contact card. A button appears as soon as its link has an address and stays hidden while it is empty.

The Résumé button downloads `public/files/Anil_Kumar_HJ_Senior_Angular_Developer.pdf`. To update your résumé, replace that file with the new PDF (keep the name, or change `links.resume` to match). Note that the PDF is public once the site is deployed, so anything in it, including the phone number, can be read by anyone.

### Add screenshots, impact or links to a project

Each project card in `PROJECTS` (same file) can take more lines: add to `points`, `tech` or `links`. Only add facts you can stand behind, such as real numbers or live links.

## Build

```bash
npm run build        # output: dist/anilkumar-portfolio/browser
npm run build:pages  # same, with the /my-portfolio/ base path used by GitHub Pages
```

## Deploy to GitHub Pages

1. Push this repo to GitHub as **`my-portfolio`** (the repo name becomes the URL path).
2. In the repo, open **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which builds and publishes the site.

If you use a different repo name, update the address in `src/index.html` (canonical link, Open Graph tags and structured data) and `SITE_URL` in `src/app/data/profile.ts`.

## Project layout

```
src/
  index.html            SEO tags, structured data, theme script
  styles.css            design tokens (light and dark) and all styles
  app/
    data/profile.ts     all page content
    app.ts              page shell
    nav, hero, skills, experience, recognition, education, contact, footer
    theme.ts            light/dark mode      toast.ts   copy-to-clipboard message
    reveal.ts           scroll-in animation  count-up.ts animated numbers
public/                 favicon and profile photo
```
