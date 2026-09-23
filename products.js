/*
  QUICK PRODUCT EDITING
  ---------------------
  Duplicate one product block, then change its values.
  - price is a number in AUD, without a dollar sign.
  - image can be a file such as "images/my-product.jpg" or a full https URL.
  - checkoutUrl should be your Stripe Payment Link. Leave it blank until ready.
  - category is used to create the filter buttons automatically.

  You can also open manage.html to create products and export this file.
*/

window.STORE_PRODUCTS = [
  {
    id: "dragon-desk-buddy",
    name: "Dragon Desk Buddy",
    price: 24.95,
    category: "Collectibles",
    description: "An articulated display piece with satisfying movement and sharp geometric detail.",
    image: "images/hero-products.png",
    imageAlt: "Black geometric articulated dragon in a blue and violet studio scene",
    badge: "New",
    checkoutUrl: ""
  },
  {
    id: "headphone-stand",
    name: "Tower Headphone Stand",
    price: 32.00,
    category: "Desk gear",
    description: "A stable statement stand that keeps your headphones off the desk and ready to grab.",
    image: "images/hero-products.png",
    imageAlt: "Black geometric headphone stand in a blue and violet studio scene",
    badge: "Popular",
    checkoutUrl: ""
  },
  {
    id: "setup-organiser",
    name: "Modular Setup Organiser",
    price: 28.50,
    category: "Organisation",
    description: "Mix-and-match storage for pens, cables and the small stuff that takes over your setup.",
    image: "images/hero-products.png",
    imageAlt: "Black modular desk organiser in a blue and violet studio scene",
    badge: "",
    checkoutUrl: ""
  }
];
