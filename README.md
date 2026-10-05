# Drivehouse

A responsive React storefront for browsing ATVs, bicycles, jet skis, and boat engines, sending product enquiries, and viewing a sample delivery tracking status.

## Run locally

```sh
npm install
npm run dev
```

## Product photos and descriptions

1. Upload photos into the matching category folder: `public/images/atv/`, `public/images/bicycle/`, `public/images/jet-ski/`, or `public/images/boat-engines/`.
2. In GitHub, open the folder, choose **Add file → Upload files**, select JPG or WebP photos, then commit the changes.
3. In `src/main.jsx`, update that product's `image` value to a public URL path such as `'/images/atv/outlander.jpg'`. The `public` part is omitted from the URL.
4. Edit that product's `description` value in the same product entry. The description appears on its card.
5. Commit the code update. Netlify will redeploy from GitHub. The image helper accepts local `/images/...` paths as well as the current sample Unsplash IDs.

For the large hero background, replace the Unsplash URL in `.hero-image` in `src/styles.css` with `url('/images/hero.jpg')`. The mobile hero has its own background URL in the same file, so replace that one too if you want the same image on phones.

Use photos you own or have permission to use. Compressed JPG or WebP images keep the page quick to load.

Product enquiry submissions are collected by Netlify Forms in the site's Netlify dashboard; enable form detection in the Netlify Forms settings if it is not already enabled. The tracking lookup shows a sample delivery status and needs a connected shipping provider for live tracking.
