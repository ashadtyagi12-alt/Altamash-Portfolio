# Altamash — Premium Cinematic Portfolio Website

> **Cinematic, scroll-driven interactive portfolio website for Altamash — Website Developer, Python Developer, and Content Creator.**

Built with **React 19**, **TypeScript**, **Tailwind CSS**, **GSAP (ScrollTrigger)** for scroll-scrubbed kinematics, **Lenis** for inertial smooth scroll, and **Lucide Icons**.

---

## 🚀 Quick Start

### 1. Install & Run Locally

```bash
# Navigate to the project directory
cd altamash-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://developeraltamash.com` (or the port displayed in the console).

### 2. Production Build

```bash
npm run build
npm run preview
```

---

## ⚙️ Centralized Configuration Guide

All texts, contact links, stats, projects, videos, images, skills, and GitHub settings are located in **one single master file**:
👉 `src/config/portfolio.config.ts`

### 1. Personal Information & Social Links
In `src/config/portfolio.config.ts`, under `personal`:
```ts
personal: {
  name: 'Altamash',
  brandName: 'ALTAMASH.',
  profession: 'WEBSITE DEVELOPER | PYTHON DEVELOPER | CONTENT CREATOR',
  professionShort: 'Website Developer • Python Developer • Content Creator',
  location: 'Pilkhuwa, Hapur, UP, India',
  instagram: 'https://www.instagram.com/developer_altamash/',
  youtube: 'https://www.youtube.com/@developer_altamash',
  github: 'https://github.com/ashadtyagi12-alt',
  githubUsername: 'ashadtyagi12-alt',
  email: 'altamishkhan123pkw@gmail.com',
  whatsapp: '917452819619',
  whatsappFormatted: '+91 7452819619',
  handle: '@developer_altamash',
  heroGreeting: "Hello, I'm",
  heroHeadline: 'CREATING DIGITAL EXPERIENCES THAT STAND OUT.',
  heroBio: "...",
  quoteText: "...",
}
```

### 2. Replacing Images & Media Assets
All media files live in the `public/media/` directory:
- **Cut-out Portrait**: Replace `public/media/altamash-portrait.svg` (or `.png` / `.webp`) with your own transparent cutout photo.
- **Showreel Video**: Place your video file at `public/media/showreel.mp4`.
- **Showreel Poster**: Replace `public/media/showreel-poster.svg` (or `.jpg`).
- **Before/After Transformation**: Replace `public/media/raw-project.svg` (wireframe/draft) and `public/media/real-project.svg` (final polished design).
- **Project Previews**: Replace `public/media/project-1.svg` to `project-4.svg`.

### 3. Adding & Editing Projects
In `src/config/portfolio.config.ts`, modify the `projects` array:
```ts
{
  id: 'your-project-id',
  number: '01',
  title: 'Project Name',
  category: 'Websites', // 'Websites' | 'Content' | 'AI Videos' | 'Python'
  categoryLabel: 'Website Development',
  year: '2025',
  shortDescription: 'Brief description shown on the card...',
  fullDescription: 'Comprehensive case study shown in the deep-dive modal...',
  image: '/media/project-1.svg',
  tools: ['React', 'TypeScript', 'Tailwind', 'GSAP'],
  metrics: 'Sub-100ms LCP • 60 FPS Transitions',
  liveUrl: 'https://your-live-demo.com',
  githubUrl: 'https://github.com/your-repo',
  isSample: false, // Set to false for your real projects!
  featured: true,
}
```

### 4. GitHub Repositories Integration
- The website connects automatically to the public GitHub API:
  `https://api.github.com/users/{githubUsername}/repos`
- If you are offline or hit GitHub's unauthenticated API rate limits, it automatically falls back to `manualRepos` defined in `portfolio.config.ts`.
- You can add or modify your verified repositories in `portfolioConfig.manualRepos`.

### 5. Contact Form Backend Setup
The contact form includes field validation, interactive loading states, and a direct WhatsApp fallback with pre-filled text.

To route form submissions directly to your email inbox, you can connect any of the following free services:
- **Formspree**: Replace the submission handler in `src/components/ContactSection.tsx` with a standard `fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: JSON.stringify(formData) })`.
- **EmailJS**: Install `@emailjs/browser` and call `emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formRef.current, 'YOUR_PUBLIC_KEY')`.
- **Resend**: Connect your Next.js/Vite serverless API route using `resend.emails.send()`.

---

## 🎨 Global Design System
- **Background**: `#07080D` (Near-black with deep navy tint)
- **Primary Accent**: `#FF3B47` (Hot Coral Red)
- **Display Typography**: Condensed Sans (`Anton`, `Bebas Neue`, `Oswald`)
- **Body Typography**: Clean Modern Sans (`Plus Jakarta Sans`, `Inter`)
- **Script Accent**: `Caveat` for handwritten greetings and signature
- **Headings Rule**: Two lines — line 1 white, line 2 hot red

---

## 🎬 Animation System Highlights
- **Cinematic Loader**: Black screen intro with animated thin red line, letter-by-letter reveal of `ALTAMASH`, 0 to 100 counter, and smooth wipe-up transition.
- **Inertial Smooth Scroll**: Lenis smooth scrolling connected to GSAP ScrollTrigger ticker.
- **Custom Cursor Particles**: 52 floating pale cursor-arrow particles on desktop that scatter away from mouse movement. When scrolling to the Contact section, they gather and form an orbiting ring around the finale card (`#contact-interactive-card`).
- **Interactive Before/After Slider**: Auto-animates on entrance and supports touch/mouse dragging.
- **From Idea to Final Frame**: Scroll-scrubbed red progress timeline with numbered step beacons.
- **Motion Accessibility**: Automatically respects `prefers-reduced-motion` to disable particle physics and parallax scrubs for users who prefer reduced motion.

---

Designed & Engineered for **Altamash** — Pilkhuwa, Hapur, UP, India.
