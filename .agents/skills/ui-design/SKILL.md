---
name: ui-design
description: >-
  Comprehensive guide and design system rules for modern UI design, visual hierarchy, luxury and corporate color palettes, responsive typography scales, component layout, Tailwind CSS, micro-interactions, dark/light modes, and WCAG accessibility standards. Activate when building, styling, or refining web frontends, landing pages, dashboards, or design systems.
---

# UI Design & Styling Skill

This skill provides actionable principles, design tokens, and frontend implementation patterns for crafting modern, aesthetically pleasing, and responsive user interfaces.

---

## 1. Core Visual Principles

### 1.1 Visual Hierarchy & Contrast
- **Primary Focal Point**: Each screen or section must have a single primary action or headline that captures immediate attention.
- **Scale Contrast**: Use clear size differences (e.g., `text-4xl` or `text-5xl` for Hero headings vs `text-lg` for subtitles, `text-sm` for captions).
- **Weight Contrast**: Pair bold weights (`font-bold` or `font-semibold`, 600-700) for headers with regular weights (`font-normal`, 400) for body text.
- **Color Contrast**: Ensure text adheres to WCAG AA standard (at least 4.5:1 ratio for normal text, 3:1 for large text). Never use low-contrast gray text on light backgrounds.

### 1.2 Luxury & Editorial Aesthetics (e.g. Sourcing, Architecture, High-End Goods)
- **Palette**:
  - Background: Warm Alabaster (`#FBFBF9`), Soft Cream (`#F7F5F0`), or Pure White (`#FFFFFF`).
  - Text & Accents: Deep Charcoal / Obsidian (`#18181B`), Muted Slate (`#4A5568`), Warm Ochre / Brass (`#C2A684` / `#B8860B`).
  - Borders: Ultra-subtle borders (`border-stone-200`, `border-neutral-200/60`).
- **Typography Pairing**:
  - Headings: Editorial Serifs (Playfair Display, Cormorant Garamond, or Merriweather).
  - Body & UI Controls: Crisp modern Sans-Serif (Plus Jakarta Sans, Inter, or Outfit).

---

## 2. Spacing, Layout & Grid Systems

- **8-Point Spacing Grid**: Use standard spacing increments (`gap-2` = 8px, `gap-4` = 16px, `gap-6` = 24px, `gap-8` = 32px, `gap-12` = 48px, `gap-16` = 64px).
- **Container Max-Widths**:
  - Landing pages: `max-w-7xl` (1280px) or `max-w-6xl` (1152px) centered with `mx-auto px-4 sm:px-6 lg:px-8`.
  - Reading content / Articles: `max-w-3xl` or `max-w-4xl`.
- **Vertical Rhythm**:
  - Section padding: `py-16 md:py-24 lg:py-28` to give content room to breathe.
  - Section headers: Margin bottom `mb-12` or `mb-16`.

---

## 3. Key Component UI Patterns

### 3.1 Header & Sticky Navbar
- Fixed or sticky header (`sticky top-0 z-50`) with backdrop blur (`backdrop-blur-md bg-white/90` or `bg-stone-900/90`).
- Crisp brand logo + centered navigation links + prominent right-side CTA button.
- Mobile hamburger menu with smooth slide-over drawer or accordion collapse.

### 3.2 Hero Section
- High-impact headline with letter-spacing (`tracking-tight`).
- Clear category / trust badge pill (`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium`).
- Dual CTA buttons: Primary solid button (`bg-stone-900 text-white hover:bg-stone-800 shadow-sm`) + Secondary ghost/outline button (`border border-stone-300 hover:bg-stone-50`).

### 3.3 Cards & Content Blocks
- Rounded corners: `rounded-xl` or `rounded-2xl`.
- Subtle borders: `border border-stone-200/80`.
- Elevation & Hover: `transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-stone-300`.
- Aspect ratios: Use `aspect-[4/3]` or `aspect-[16/9]` for imagery with `object-cover`.

### 3.4 Interactive Modals & Drawers
- Backdrop overlay: `fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4`.
- Modal panel: `bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200`.
- Close button positioned top-right with accessible `aria-label="Close"`.

---

## 4. Micro-Interactions & Transitions

- Always specify transition duration and easing: `transition duration-200 ease-out` or `transition-all duration-300`.
- Interactive states:
  - `:hover` for pointer devices.
  - `:active` scale feedback (`active:scale-95`).
  - `:focus-visible` outline for keyboard accessibility (`focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-stone-900`).
