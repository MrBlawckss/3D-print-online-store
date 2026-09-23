# NeonLayer 3D storefront

A builder-free, static online store for GitHub Pages. It includes responsive light/dark themes, product search and filters, Australian-dollar prices, shipping information, Stripe Payment Link support, and a local catalogue editor.

## Publish on GitHub Pages

1. Download or unzip this project.
2. In your GitHub repository, choose **Add file → Upload files**.
3. Upload every file and the `images` folder to the repository root, then commit the upload.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Choose the `main` branch and `/ (root)`, then save.
7. GitHub will show the public store address after deployment finishes.

## Add products with the catalogue editor

Open `manage.html` from the live site by adding `/manage.html` to its address.

1. Upload each product photo into the repository's `images` folder.
2. In the editor, enter the photo path as `images/your-photo-name.jpg`.
3. Add the product details.
4. Select **Download products.js**.
5. Replace the repository's existing `products.js` with the downloaded file and commit the change.

The catalogue editor stores its draft only in that browser. It does not change the live website until the downloaded file is uploaded to GitHub. This is intentional: GitHub Pages has no private database or secure admin login.

## Activate checkout

1. Create a product in Stripe.
2. Create its Payment Link.
3. Paste the `https://buy.stripe.com/...` link into the product's **Stripe Payment Link** field in `manage.html`, or into `checkoutUrl` in `products.js`.
4. Upload the updated `products.js` file.

Products without a valid Stripe link show **Coming soon** instead of sending shoppers to a broken checkout.

## Rename the store

Search the files for `NeonLayer` and replace it with the final store name. Update the page title and description near the top of `index.html` as well.

## Store-name shortlist

- NeonLayer 3D
- LayerShift
- NovaForm 3D
- MeltMode
- StackLab 3D
- OrbitForge

These are creative suggestions, not trademark or business-name clearance. Check ASIC, Australian trademarks, domains and social handles before committing to a final name.

## Product photo tips

- Use landscape images around 1200 × 900 pixels.
- Keep every product centred with a consistent background.
- Compress images before uploading so the store loads quickly.
- Use original photos and avoid unlicensed characters, logos or models.

