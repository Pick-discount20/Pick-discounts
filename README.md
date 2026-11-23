# Peak Discount — Local Business Discovery Marketplace

A local business discovery and verification marketplace built using Next.js, React, TypeScript, and Tailwind CSS.

---

## 📌 Project Overview

**Peak Discount** is a modern frontend prototype designed to demonstrate local business discovery, verification, and community trust. It provides an intuitive, high-quality user experience for consumers discovering trusted local establishments, business owners managing listings and verification claims, and platform administrators moderating content.

> **Note:** This project is a frontend prototype built for client review and UX demonstration prior to MVP 1 backend development. All data is mock-driven and runs client-side without external database or authentication dependencies.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Font Families:** Plus Jakarta Sans & Playfair Display

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ or 20+
- npm (or pnpm / yarn)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pick-discount20/Pick-discounts.git
   cd Pick-discounts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Local Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the prototype.

### Production Build

To test the production build:
```bash
npm run build
npm run start
```

---

## 🗺️ Available Frontend Routes

| Route | Description |
|---|---|
| `/` | **Homepage** — Yelp-inspired photographic hero with automatic & manual carousel, category shortcuts, featured verified businesses, trust counters, and customer testimonials. |
| `/search` | **Discovery & Search** — Multi-parameter business search with keyword, location, category filters, verified badges, rating sorting, and responsive layout. |
| `/business/[slug]` | **Business Profile** — Comprehensive profile view with hero photo header, opening hours, verified badges, reviews, photo gallery, and report dialog. |
| `/owner/claim` | **Claim Business** — Multi-step verification workflow for business owners to claim listings with evidence submission and manual review confirmation. |
| `/owner/dashboard` | **Owner Dashboard** — Clean SaaS portal to monitor listing status, verification progress, and customer review summaries. |
| `/owner/profile` | **Edit Business Profile** — Form interface for business owners to update contact information, hours of operation, and service details. |
| `/admin/dashboard` | **Admin Moderation Portal** — Moderation queue for platform administrators to review claims, verify evidence, inspect reported content, and audit listings. |
| `/login` | **Authentication (Sign In)** — Role-aware sign-in page with tabs for Customers and Business Owners. |
| `/register` | **Authentication (Registration)** — Customer and business owner onboarding flow with trust disclosures. |

---

## 📄 License

Private repository for client evaluation and prototype demonstration.
