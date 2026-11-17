---
name: seo-optimization
description: >-
  Comprehensive guidelines and technical checklist for technical SEO, on-page search engine optimization, Schema.org JSON-LD structured data, Open Graph and Twitter Card metadata, Core Web Vitals, semantic HTML5 tags, and search engine crawler indexing. Activate when optimizing web pages, setting up metadata, enhancing organic search visibility, or auditing SEO performance.
---

# SEO Optimization & Structured Data Skill

This skill provides step-by-step technical SEO instructions, metadata templates, and search engine indexing standards to ensure maximum organic search performance, rich snippet rendering, and social sharing visibility.

---

## 1. On-Page & Semantic HTML5 Standards

### 1.1 Heading Tag Hierarchy
- **Strict Single H1**: Exactly one `<h1>` per page representing the core keyword and entity (e.g., `<h1>XP Sourcing - Premier B2B Product Sourcing from India</h1>`).
- **Logical Nesting**:
  - `<h2>` for major sections (Services, Product Categories, Case Studies, Testimonials, About Us).
  - `<h3>` for cards, service items, and category sub-elements.
  - Never skip levels (e.g., never jump from `<h2>` directly to `<h4>`).

### 1.2 Semantic Layout Tags
- Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.
- Use descriptive anchor text (`<a href="/services">Explore Product Sourcing Services</a>`) instead of generic labels like "Click here" or "Read more".

---

## 2. Document Head & Metadata Template

Every production HTML document must include:

```html
<!-- Primary Meta Tags -->
<title>XP Sourcing | Global B2B Product Sourcing & Supply Chain Partner from India</title>
<meta name="title" content="XP Sourcing | Global B2B Product Sourcing & Supply Chain Partner from India">
<meta name="description" content="Your trusted sourcing partner for home, lifestyle, furniture, lighting, and textiles from India & East Asia. End-to-end quality control, supplier audits, and logistics.">
<meta name="keywords" content="product sourcing india, b2b sourcing partner, home decor sourcing, furniture manufacturing india, quality control inspection, supply chain management">
<meta name="robots" content="index, follow">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="canonical" href="https://xpsourcing.com/">

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://xpsourcing.com/">
<meta property="og:title" content="XP Sourcing | Sourcing from India, for the World">
<meta property="og:description" content="End-to-end B2B sourcing agency dedicated to delivering unparalleled quality, custom product development, and audited supply chains.">
<meta property="og:image" content="https://xpsourcing.com/assets/og-image.jpg">

<!-- Twitter Card -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://xpsourcing.com/">
<meta property="twitter:title" content="XP Sourcing | Sourcing from India, for the World">
<meta property="twitter:description" content="End-to-end B2B sourcing agency dedicated to delivering unparalleled quality, custom product development, and audited supply chains.">
<meta property="twitter:image" content="https://xpsourcing.com/assets/og-image.jpg">
```

---

## 3. Schema.org Structured Data (JSON-LD)

Include valid JSON-LD in the `<head>` to qualify for Google Rich Snippets and Knowledge Panels:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://xpsourcing.com/#organization",
      "name": "XP Sourcing",
      "url": "https://xpsourcing.com/",
      "logo": "https://xpsourcing.com/assets/logo.png",
      "description": "Premier B2B global product sourcing and supply chain management agency connecting international retailers with top manufacturers in India and East Asia.",
      "foundingDate": "2014",
      "areaServed": ["United States", "United Kingdom", "European Union", "Australia", "Canada"],
      "sameAs": [
        "https://www.linkedin.com/company/xpsourcing/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://xpsourcing.com/#website",
      "url": "https://xpsourcing.com/",
      "name": "XP Sourcing",
      "publisher": {
        "@id": "https://xpsourcing.com/#organization"
      }
    }
  ]
}
</script>
```

---

## 4. Media & Core Web Vitals Optimization

- **Image Dimensions**: Always specify `width` and `height` attributes (or CSS aspect-ratio) on all `<img>` tags to eliminate Cumulative Layout Shift (CLS).
- **Alt Attributes**: Every image must have an informative, keyword-rich `alt` attribute (e.g., `alt="Artisan crafting handcrafted wooden dining table in Rajasthan workshop"`).
- **Responsive Images**: Use `loading="lazy"` on all images below the fold. For hero images above the fold, use `fetchpriority="high"` and `loading="eager"`.
- **Preloading Critical Resources**:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ```

---

## 5. Robots.txt and Sitemap.xml

- **Robots.txt** placed at root:
  ```txt
  User-agent: *
  Allow: /
  Sitemap: https://xpsourcing.com/sitemap.xml
  ```
- **Sitemap.xml** containing all canonical URLs with `<lastmod>` and `<changefreq>`.
