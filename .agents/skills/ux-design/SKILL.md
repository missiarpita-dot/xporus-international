---
name: ux-design
description: >-
  Actionable framework and guidelines for UX design, user journey mapping, information architecture, conversion rate optimization (CRO), B2B sourcing and e-commerce flows, form usability, accessibility, interactive feedback, and cognitive load reduction. Activate when designing user flows, navigation structures, landing page conversions, B2B lead generation, or interactive forms.
---

# UX Design & Conversion Architecture Skill

This skill provides step-by-step procedures and user experience best practices for maximizing usability, reducing cognitive friction, and optimizing conversion rates for modern web applications and B2B websites.

---

## 1. User Journey & Information Architecture

### 1.1 The Above-the-Fold Value Equation
In the first 3 seconds, a visitor must understand:
1. **What you do**: Clear, jargon-free value proposition (e.g., *"Sourcing from India, for the World"*).
2. **Who it is for**: Explicit target audience identification (e.g., *"Global retailers, wholesalers & interior brands"*).
3. **What to do next**: Unambiguous primary call to action (e.g., *"Let's Speak"* / *"Request a Sourcing Quote"*).

### 1.2 Scanning Patterns & Content Sequencing
- Structure pages using the **F-Pattern** (for text-heavy sections) and **Z-Pattern** (for visual landing pages).
- **Logical Flow**:
  1. Hero (hook + value proposition)
  2. Proof & Trust Bar (metrics: years active, countries served, vendor count)
  3. Core Capabilities / Services (problem-solution breakdown)
  4. Real-world Proof / Case Studies (tangible results)
  5. Interactive Catalog / Product Category Explorer
  6. Differentiators ("Why Choose Us" / "What Sets Us Apart")
  7. Client Testimonials / Social Proof
  8. Final High-Conversion Inquiry / Contact Section

---

## 2. B2B Sourcing & Lead Generation UX

### 2.1 Frictionless Request for Quote (RFQ) / Inquiry Flow
- **Progressive Disclosure**: Keep the initial form brief (Name, Work Email, Company, Category of Interest). Do not ask for 15 fields upfront.
- **Micro-Copy Matters**:
  - Instead of *"Submit"*, use value-oriented verbs like *"Get Sourcing Consultation"*, *"Send Sourcing Brief"*, or *"Speak with a Sourcing Specialist"*.
  - Add reassurance text under the button: *"100% Confidential. Typical response within 24 hours."*

### 2.2 Interactive Product Category Discovery
- Provide instant category filtering with clean pill tabs (e.g., Furniture, Textiles, Lighting, Kitchenware, Decor).
- Ensure filtering happens instantly in-memory without page reloads.
- Include a direct "Inquire about this category" action trigger on hover or click.

---

## 3. Form Usability & Accessibility

- **Input Fields**:
  - Always pair inputs with visible, unambiguous labels.
  - Generous padding (`py-3 px-4`) and comfortable font size (`text-base` to prevent auto-zoom on iOS).
  - Clear focus indicator: High-contrast ring (`focus:ring-2 focus:ring-stone-900 focus:border-stone-900`).
- **Validation & Error Handling**:
  - Validate email formats and phone numbers gently on blur (`blur` event) rather than while the user is typing.
  - Display helpful, polite error messages directly below the offending input field.
- **Success Feedback**:
  - When submitted, replace form content with an animated checkmark, a confirmation heading, and next steps: *"Thank you! Our sourcing team has received your brief and will contact you within 24 hours."*
- **Keyboard & Modal Accessibility**:
  - Pressing `Escape` must immediately close open modals or drawers.
  - Clicking outside the modal content (on the dark backdrop) must dismiss the modal.
  - Focus trap: Keep keyboard focus trapped inside the modal while open.

---

## 4. Mobile & Touch Usability

- Minimum touch target size: At least **44x44px** for buttons, links, and form elements.
- Thumbs-friendly navigation: Sticky bottom bar or easily reachable hamburger menu button on mobile viewports.
- Prevent horizontal overflow (`overflow-x-hidden` on `body`/`html`).
