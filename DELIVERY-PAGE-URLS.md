# Delivery Page URLs

Secret access URLs for paid class delivery pages.
These pages are noindex and not linked anywhere on the public site.
Share these URLs with Zylvie as the "thank you / redirect after purchase" URL for each product.

| Product | Secret URL | Set as Zylvie post-purchase redirect | YouTube embed placeholder |
|---------|-----------|-------------------------------------|--------------------------|
| How to Become Emotionally Bulletproof | https://www.michaelhetherington.com/class-access/bulletproof-x7k2m9/ | [ZYLVIE-REDIRECT-BULLETPROOF] | [YOUTUBE-LINK-BULLETPROOF] |
| EFT for Clearing Food Sensitivities | https://www.michaelhetherington.com/class-access/food-sensitivities-p4n8q1/ | [ZYLVIE-REDIRECT-FOOD] | [YOUTUBE-LINK-FOOD] |
| Clear the Weight | https://www.michaelhetherington.com/class-access/clear-the-weight-r3j6v5/ | [ZYLVIE-REDIRECT-WEIGHT] | [YOUTUBE-LINK-WEIGHT] |
| EFT Tapping for Pain Relief | https://www.michaelhetherington.com/class-access/pain-relief-w9s2h4/ | [ZYLVIE-REDIRECT-PAIN] | [YOUTUBE-LINK-PAIN] |
| Unlock Deep Rest | https://www.michaelhetherington.com/class-access/unlock-deep-rest-m6f1t8/ | [ZYLVIE-REDIRECT-SLEEP] | [YOUTUBE-LINK-SLEEP] |
| Trauma-Informed EFT | https://www.michaelhetherington.com/class-access/trauma-informed-eft-b5c9n3/ | [ZYLVIE-REDIRECT-TRAUMA] | [YOUTUBE-LINK-TRAUMA] |
| Unblock Your Wealth | https://www.michaelhetherington.com/class-access/unblock-your-wealth-d2l7k6/ | [ZYLVIE-REDIRECT-WEALTH] | [YOUTUBE-LINK-WEALTH] |
| EFT for Headaches & Migraines | https://www.michaelhetherington.com/class-access/headache-migraine-relief-z8v5q2/ | [ZYLVIE-REDIRECT-HEADACHE] | [YOUTUBE-LINK-HEADACHE] |

## Setup instructions

1. In Zylvie, go to each product's settings → "Thank you page URL" → paste the Secret URL above
2. Add the YouTube video embed by replacing the `[VIDEO EMBED PLACEHOLDER]` block in each delivery page file
3. Add PDF download links in the "Your resources" section of each delivery page
4. Replace `[CONTACT-EMAIL-PLACEHOLDER]` with your support email address

## Security model

- Pages use `noindex: true` front matter → triggers `<meta name="robots" content="noindex, nofollow">` in head
- `/class-access/` is disallowed in robots.txt
- Pages are not linked from any public page or sitemap
- Obscure URL slugs (e.g., `-x7k2m9`) add a layer of access obfuscation
- Full authentication is not possible on static GitHub Pages — these measures are the maximum available
