# PRINCE2 Guide — Liquid Glass Editorial

A static HTML/CSS/JavaScript PRINCE2 learning site inspired by Medium's reading-first philosophy and redesigned with a restrained liquid-glass visual system.

## Files
- `index.html` — homepage
- `blog.html` — searchable/filterable article archive
- `article.html?id=...` — article reader
- `about.html` — about page
- `css/style.css` — design system and responsive styles
- `js/articles.js` — article data + shared article card renderers
- `js/main.js` — global UI interactions

## Add an article
Edit `js/articles.js` and add another object to `ARTICLES` with:
- `id`
- `title`
- `category`
- `categories` (array)
- `date`
- `author`
- `readTime`
- `excerpt`
- `keywords`
- `body` (HTML string)

## Change the brand
Search for `PRINCE2 Guide` in the HTML files.

## Change the design
The main CSS variables are near the top of `css/style.css`, including background, text, accent, glass surfaces, shadows and radii.

## Open locally
You can open `index.html` directly in a browser. No build step or server is required for the demo.
