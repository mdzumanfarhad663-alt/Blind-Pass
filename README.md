# Blind Pass Resort Motel: Home Page Prototype

Static prototype of the new Home page. It uses vanilla HTML, CSS and JS with no build step. Each section is a self-contained block, marked by a comment in `index.html`, so it can be recreated in Elementor (Hello Elementor theme).

Brand fonts and colors are documented in `BRAND.md`. All design tokens are CSS variables in `:root` at the top of `assets/css/style.css`.

## Files

- `index.html`: Home page
- `rooms.html`: Rooms page, rendered from the single room list in `assets/js/rooms.js`
- `local-guide.html`: Local Guide page, with styles in `assets/css/local-guide.css` and behavior in `assets/js/local-guide.js`
- `gift-cards.html`: Gift Cards page, with styles in `assets/css/gift-cards.css` and behavior in `assets/js/gift-cards.js`
- `contact.html`: Contact page, with styles in `assets/css/contact.css` and behavior in `assets/js/contact.js`
- `assets/css/style.css`, `assets/css/rooms.css`, `assets/js/main.js`, `assets/js/rooms-page.js`, `assets/img/`, `assets/video/`
- `BRAND.md`: extracted brand values
- `render.yaml`: Render static site definition

## Run Locally

Run a local server from this folder.

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
2. **Final gift card purchase URL.** "Buy a Gift Card" points at the current Squarespace shop (`https://www.blindpassresort.com/giftcard/p/gift-cards-coastal-getaway-vacations`), which will be retired. Marked in `gift-cards.html`.
3. **[CONFIRM IMAGE] Explore tile image: Corey Avenue.** Still a property photo until a photo of Corey Avenue is supplied. Marked in `index.html`. The Fort De Soto, John's Pass and Busch Gardens tiles now use licensed photos (see "Licensed photos" below).
4. **[CONFIRM PHOTOS] Queen Studio Suite.** Cloudbeds only has low-resolution `microsoftteams-image` photos for this room. Marked in `rooms.html` and `assets/js/rooms.js`.
5. **Exact pet fee and limits.** The Rooms and Contact pages say only that fees apply and are discounted the longer guests stay. Marked in `rooms.html` and `contact.html`.
6. **[CONFIRM IMAGE] Local Guide images: hero and Corey Avenue.** The hero uses the courtyard fountain photo from Home, and the Corey Avenue row uses a property photo, until real photos are supplied. Marked in `local-guide.html`. The Beach, John's Pass, Fort De Soto and Busch Gardens rows now use licensed photos.
7. **Gift card redemption.** Are cards redeemable at all Coastal Collection properties, or at Blind Pass only? The Contact FAQ answers "Contact our team to confirm." Marked in `gift-cards.html` and `contact.html`.
8. **Gift cards and room types.** Can a gift card be used for any room? The Contact FAQ answers "Contact our team to confirm." Marked in the Contact FAQ in `contact.html`.
9. **Gift card delivery method.** Email or physical card. The How It Works copy makes no delivery promise. Marked in `gift-cards.html`.
10. **[CONFIRM PHOTOS] Gift Cards hero.** The source is a 700 px photo from the current booking engine, enlarged for this page. Ask for the original file. Marked in `gift-cards.html`.
11. **[CONFIRM PHOTOS] Contact hero.** The source is a 700 px aerial photo from the current booking engine, enlarged for this page. Ask for the original file. Marked in `contact.html`.

## Other Notes For The WordPress Build

- **Gift Cards page** has no payment form and no Product or Offer schema. Add schema after the purchase setup is confirmed.
- **Contact forms** are front-end only and send data nowhere. In Elementor Forms, send to reservations@coastalgetaway.com with Reply-To set to the email field. Field IDs: `full_name`, `email`, `phone`, `message` for Send a Message, and `full_name`, `email`, `phone`, `arrival_date`, `departure_date`, `rooms`, `guests`, `pets`, `details` for Group Booking. Use the Elementor Honeypot field in place of the `website` field.
- **Rewards form** is front-end only. It validates and shows an inline success message, but it sends data nowhere.
- **Hero video** is a 13.8-second loop cut only from the title-free clips of the current site's montage: resort pool, a room, John's Pass, and a boat at the St. Pete Pier. `hero.mp4` is 1920 px wide at CRF 28 and `hero-mobile.mp4` is 720 px wide. The sunset pier clip is left out because the source video labels that area Pier 60, which may not be St. Pete Beach. Host it on a server with HTTP Range support.
- **Lenis** smooth scrolling loads from jsDelivr on desktop pointer devices only. All other motion is in `assets/js/main.js` and `assets/css/style.css`.
- **Logo** source is 500 px wide. Ask the client for a vector or larger file before using it wider than about 250 px.
- **Cloudbeds property description** contains a TripAdvisor claim. It is not used here, but it still appears on the booking page.
- **Room links** use `#rid=<rid>`. Cloudbeds defaults to the next night and moves the requested room to the top of the list. A room that is sold out on those dates stays in the Sold Out group at the bottom.
- **Room data** lives in one array in `assets/js/rooms.js`. The JSON-LD and no-JavaScript list in `rooms.html` were generated from it, so update them if a room changes.
- **Icons** are from Lucide (ISC license), inlined as an SVG sprite at the top of `index.html`.

## Licensed photos

The Beach & Sunsets, John's Pass, Fort De Soto and Busch Gardens photos (`assets/img/guide/`) come from Wikimedia Commons under CC BY 3.0 / CC BY-SA 4.0. Each one **must keep its visible credit line**: a caption under the photo on Local Guide (`.photo-credit`). The Home Explore tiles reuse the same photos without a label; the Local Guide captions are the site's credit for them. Sources, authors, licenses and exact credit lines are in `../wp-upload/local-guide/CREDITS.md`.
