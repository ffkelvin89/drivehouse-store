# Drivehouse

A responsive React storefront for browsing ATVs, bicycles, jet skis, and boat engines, sending product enquiries, and viewing a sample delivery tracking status.

## Run locally

```sh
npm install
npm run dev
```

## Manage products yourself

The product manager will be available at [the Drivehouse admin page](https://fanciful-cuchufli-978dc4.netlify.app/admin/) once this update is published and connected. It lets you add, edit, and remove products, upload a main photo, choose a category and currency, and set the name, description, price, and product details. Saving a product creates a GitHub commit; Netlify then rebuilds the storefront.

### One-time setup

This project uses Decap CMS with Decap Turbo for sign-in and GitHub access. Git Gateway is deprecated for new Netlify setups, so the CMS does not depend on it.

1. Create a Decap Turbo account and connect the GitHub account that owns `ffkelvin89/drivehouse-store`.
2. Create a CMS site for that repository and set the admin URL to your Netlify site URL followed by `/admin/`.
3. Copy the CMS Site ID from Decap Turbo into `turbo_site_id` in `public/admin/config.yml`, then publish that config with the rest of this project.
4. Open your Netlify site at `/admin/` and sign in through Decap Turbo.

The Turbo free plan currently includes one site and one seat. See [Decap Turbo setup](https://decapcms.org/docs/turbo-getting-started/) and [connecting a site](https://decapcms.org/docs/turbo-connecting-a-site/).

Uploaded photos are stored under `public/images/` in the repository. Use compressed JPG, PNG, or WebP images that you own or have permission to use.

Product enquiry submissions are collected by Netlify Forms in the site's Netlify dashboard; enable form detection in the Netlify Forms settings if it is not already enabled. The tracking lookup shows a sample delivery status and needs a connected shipping provider for live tracking.
