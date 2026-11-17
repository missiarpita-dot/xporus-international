---
name: ui-ux-pro-max
description: >-
  UI/UX Pro Max — Advanced design intelligence skill with industry-specific UI styles, color palettes, typography pairings, micro-interaction physics, conversion architecture, anti-pattern checks, and pre-delivery quality gates. Activate whenever designing, building, or upgrading web interfaces, landing pages, B2B portals, SaaS apps, or admin dashboards.
---

# UI/UX Pro Max — Design Intelligence & Execution System

This skill enforces top-1% agency-grade UI/UX design standards (Linear, Stripe, Apple, Medoc Sourcing level polish) across layout, typography, color harmony, motion physics, and conversion UX.

---

## 1. Industry Design Archetype: Global B2B Trade, Consulting & Luxury Sourcing

- **Primary Style**: **Swiss Corporate Minimalism + Atmospheric Glassmorphism**
- **Color Tokens (Sapphire & Midnight System)**:
  - Primary Brand: `#2563EB` (Sapphire 600) -> Hover `#1D4ED8` (Cobalt 700)
  - Deep Authority Surface: `#0B132B` (Midnight Navy)
  - Light Surface: `#FFFFFF` (Pure Surface) & `#F8FAFC` (Slate 50 Section Contrast)
  - Subtle Tints: `#EFF6FF` (Ice Blue 50 Pill Background) & `#DBEAFE` (Border Accent)
  - Text Hierarchy: `#0F172A` (Heading Obsidian), `#475569` (Body Slate), `#64748B` (Muted Meta)
- **Typography Scale & Pairing**:
  - Display / Headings: **Plus Jakarta Sans** (`700` Bold / `800` ExtraBold, tracking `-0.025em`, line-height `1.12`)
  - Body / UI Controls: **Inter** (`400` Regular / `500` Medium / `600` SemiBold)
  - Numeric Metrics & Indexes: `font-variant-numeric: tabular-nums` for crisp alignment.

---

## 2. UI/UX Pro Max Component & Interaction Rules

### 2.1 Above-the-Fold Hero Excellence
- Combine a subtle architectural grid or radial ambient glow with high-contrast typography.
- Include floating glassmorphic micro-badges over hero imagery (e.g., *"250+ Audited Factories"*, *"AQL 2.5 Certified QA"*) to anchor visual storytelling.
- Provide dual CTAs with clear visual hierarchy + immediate trust checkmarks below.

### 2.2 Motion Physics & Scroll Choreography
- **Scroll-Spy Navigation**: Automatically highlight the active section link in the sticky header as the viewport scrolls.
- **Animated Stat Counters**: Trigger smooth number count-up animations (`0 -> target`) when the metrics bar enters the viewport via `IntersectionObserver`.
- **Staggered Section Reveals**: Use subtle `cubic-bezier(0.16, 1, 0.3, 1)` fade-up transitions for cards without blocking initial render.
- **3D Flip-Card Physics**: Use `perspective: 1400px` and `cubic-bezier(0.23, 1, 0.32, 1)` with `backface-visibility: hidden` for tactile flip interactions.

### 2.3 B2B Conversion & Discovery UX
- **Instant Search + Pill Filtering**: In product category showcases, pair one-click category filter pills with a live instant search input that matches both category titles and nested subcategories.
- **Contextual Lead Capture**: Clicking "Inquire" on any specific Service or Product Category card must pre-select that exact item in the RFQ modal.
- **Verified Social Proof**: Testimonial cards must display 5-star ratings, country badges, verified buyer tags, client avatars, and interactive slider controls.

---

## 3. Pre-Delivery Pro Max Quality Checklist

- [ ] No raw emoji icons — use crisp SVG icons (Lucide) with consistent stroke width (`1.75` or `2`).
- [ ] All interactive cards have hover elevation, border color transition, and `cursor-pointer`.
- [ ] Contrast ratio meets WCAG AA (`4.5:1+`) on both light cards and dark Midnight Navy sections.
- [ ] Responsive layout tested across `375px` (Mobile), `768px` (Tablet), and `1280px+` (Desktop).
- [ ] `prefers-reduced-motion` respected for users with motion sensitivity.
