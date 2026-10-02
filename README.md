# Drivehouse

A responsive React storefront concept for browsing cars, ATVs, bicycles, jet skis, and boat engines; saving selections in a cart; and viewing a sample delivery tracking status.

## Run locally

```sh
npm install
npm run dev
```

## Add your own product photos

1. Put image files in `public/images/` (create the `images` folder if needed), for example `public/images/atv.jpg`.
2. In `src/main.jsx`, change the matching inventory item's `image` value to a root path such as `'/images/atv.jpg'`.
3. Repeat for each listing. The image helper accepts local `/images/...` paths as well as the current sample Unsplash IDs.

For the large hero background, replace the Unsplash URL in `.hero-image` in `src/styles.css` with `url('/images/hero.jpg')`. The mobile hero has its own background URL in the same file, so replace that one too if you want the same image on phones.

Use photos you own or have permission to use. Compressed JPG or WebP images keep the page quick to load.

The storefront uses sample inventory and a demo checkout flow. Tracking lookups show a sample delivery status; real checkout, inventory, and carrier tracking need a connected commerce and shipping service.
