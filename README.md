# Blind Pass Resort Motel: Home Page Prototype

Static prototype of the new Home page. It uses vanilla HTML, CSS and JS with no build step. Each section is a self-contained block, marked by a comment in `index.html`, so it can be recreated in Elementor (Hello Elementor theme).

Brand fonts and colors are documented in `BRAND.md`. All design tokens are CSS variables in `:root` at the top of `assets/css/style.css`.

## Files

- `index.html`: Home page
- `rooms.html`: Rooms page, rendered from the single room list in `assets/js/rooms.js`
- `local-guide.html`: placeholder page for the Explore tiles
- `assets/css/style.css`, `assets/css/rooms.css`, `assets/js/main.js`, `assets/js/rooms-page.js`, `assets/img/`, `assets/video/`
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

1. **Queen Studio Suite pet policy (rid 664456).** No pet chip is shown, and the room is excluded from the Pet Friendly filter until confirmed. Marked in `rooms.html`, `assets/js/rooms.js` and the Rooms section of `index.html`.
2. **Gift Cards link.** It points at the store on the current site (`https://www.blindpassresort.com/giftcard`). Update it after the WordPress move. Marked in `index.html`.
3. **[CONFIRM IMAGE] Explore tile images.** Each tile is a neutral colored block until licensed photos exist. Marked per tile in `index.html`. To add a photo, replace the `.tile__img` span with `<img class="tile__img" src="..." alt="..." loading="lazy">`.
4. **[CONFIRM PHOTOS] Queen Studio Suite.** Cloudbeds only has low-resolution `microsoftteams-image` photos for this room. Marked in `rooms.html` and `assets/js/rooms.js`.
5. **Exact pet fee and limits.** The Rooms page says only that fees apply and are discounted the longer guests stay. Marked in `rooms.html`.

## Other Notes For The WordPress Build

- **Rewards form** is front-end only. It validates and shows an inline success message, but it sends data nowhere.
- **Hero video** comes from the current site. It is a montage with a burned-in "St. Pete Pier" title. `hero.mp4` is 1280 px wide at CRF 30 (5.8 MB). `hero-mobile.mp4` is 720 px wide (3.0 MB). Host it on a server with HTTP Range support.
- **Lenis** smooth scrolling loads from jsDelivr on desktop pointer devices only. All other motion is in `assets/js/main.js` and `assets/css/style.css`.
- **Logo** source is 500 px wide. Ask the client for a vector or larger file before using it wider than about 250 px.
- **Cloudbeds property description** contains a TripAdvisor claim. It is not used here, but it still appears on the booking page.
- **Room links** use `#rid=<rid>`. Cloudbeds defaults to the next night and moves the requested room to the top of the list. A room that is sold out on those dates stays in the Sold Out group at the bottom.
- **Room data** lives in one array in `assets/js/rooms.js`. The JSON-LD and no-JavaScript list in `rooms.html` were generated from it, so update them if a room changes.
- **Icons** are from Lucide (ISC license), inlined as an SVG sprite at the top of `index.html`.
