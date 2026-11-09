# Blind Pass Resort Motel: Home Page Prototype

Static prototype of the new Home page. It uses vanilla HTML, CSS and JS with no build step. Each section is a self-contained block, marked by a comment in `index.html`, so it can be recreated in Elementor (Hello Elementor theme).

Brand fonts and colors are documented in `BRAND.md`. All design tokens are CSS variables in `:root` at the top of `assets/css/style.css`.

## Files

- `index.html`: Home page
- `rooms.html`, `local-guide.html`: placeholder pages for the "See All Rooms" link and the Explore tiles
- `assets/css/style.css`, `assets/js/main.js`, `assets/img/`, `assets/video/`
- `BRAND.md`: extracted brand values
- `render.yaml`: Render static site definition

## Run Locally

Run a local server from this folder. Do not open `index.html` from the file system, because the `/#rewards` link needs a server root.

```bash
python -m http.server 8080
```

Then open http://localhost:8080.

## Deploy To Render

1. Push the contents of this folder to the root of a Git repository.
2. In Render, choose New, then Blueprint, and select the repository.
3. Render reads `render.yaml` and publishes the site. There is no build step.

If this folder sits inside a larger repository, set `rootDir: blindpass` on the service in `render.yaml`.

## [CONFIRM] Items

1. **Queen Studio Suite pet policy (rid 664456).** The brief leaves this open, so no pet information is shown. Marked in `rooms.html`, and noted in the Rooms section of `index.html`. The room is not one of the six Home page cards.
2. **Gift Cards link.** It points at the store on the current site (`https://www.blindpassresort.com/giftcard`). Update it after the WordPress move. Marked in `index.html`.

## Other Notes For The WordPress Build

- **Rewards form** is front-end only. It validates and shows an inline success message, but it sends data nowhere.
- **Hero video** comes from the current site. It is a montage with a burned-in "St. Pete Pier" title. `hero.mp4` is 1280 px wide because CRF 28 at 1920 px is 14.7 MB.
- **Explore tiles** use icons, so their hover zooms the icon. There is no image or overlay to animate. Cloudbeds has no photos of these places, and the area photos on the current site appear to come from third parties with unknown licensing.
- **Logo** source is 500 px wide. Ask the client for a vector or larger file before using it wider than about 250 px.
- **Cloudbeds property description** contains a TripAdvisor claim. It is not used here, but it still appears on the booking page.
- **Room links** use `#rid=<rid>`. Cloudbeds defaults to the next night and moves the requested room to the top of the list. A room that is sold out on those dates stays in the Sold Out group at the bottom.
- **Icons** are from Lucide (ISC license), inlined as an SVG sprite at the top of `index.html`.
