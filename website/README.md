# Yashvardhan Jagnani - Portfolio Website

A modern portfolio website built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

## 🚀 Tech Stack

- **Framework**: Next.js 16.0.3 with App Router
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.0 (CSS-based configuration)
- **UI Libraries**:
  - `react-calendly` - Calendly scheduling widget
  - `react-github-calendar` - GitHub contribution calendar
  - `react-responsive-carousel` - Image carousels
  - `react-easy-marquee` - Marquee animations
  - `react-tooltip` - Tooltips

## 📁 Project Structure

```
updated-website/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── layout.tsx         # Root layout with metadata & GA
│   │   ├── page.tsx           # Home page
│   │   ├── experiences/       # Experiences page
│   │   ├── projects/          # Projects pages
│   │   │   ├── page.tsx       # Projects listing
│   │   │   └── [slug]/        # Individual project pages
│   │   ├── contact/           # Contact page
│   │   ├── not-found.tsx      # Custom 404 page
│   │   └── globals.css        # Global styles + Tailwind v4 config
│   ├── components/
│   │   ├── shared/            # Shared components (Navbar, Footer, etc.)
│   │   ├── home/              # Home page components
│   │   ├── experiences/       # Experiences components
│   │   └── projects/          # Projects components
│   └── utils/
│       ├── constants/         # App constants and routes
│       ├── interfaces/        # TypeScript interfaces
│       ├── icons/             # Icon components
│       ├── logos/             # Logo components
│       └── functions.tsx      # Utility functions
├── public/                    # Static assets
│   ├── site/                  # Favicons, OG images, manifest
│   ├── experience/            # Experience images
│   ├── projects/              # Project images
│   └── *.svg                  # Logo files
├── data.ts                    # Hardcoded data (experiences, projects, etc.)
└── package.json
```

## 🎨 Features

- **Server-Side Rendering**: Fast initial page loads with App Router
- **Static Data**: No API routes, uses hardcoded data from `data.ts`
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **SEO Optimized**: Comprehensive metadata and Open Graph tags
- **Analytics**: Google Analytics integration
- **Dynamic Routing**: Individual pages for each project
- **Modern UI**: 
  - Smooth animations and transitions
  - Interactive GitHub contribution calendar
  - Spotify recently played widget
  - Stellarium web integration
  - Calendly scheduling widget

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Development Server

Open [http://localhost:3000](http://localhost:3000) to see the website.

## 📝 Data Management

All content (experiences, projects, hackathons, certifications, resumes) is stored in the root `data.ts` file. To update content:

1. Open `data.ts`
2. Edit the relevant array (experiences, projects, etc.)
3. Save the file
4. The changes will be reflected immediately in development mode

## 🎨 Styling

This project uses **Tailwind CSS v4** with CSS-based configuration. Custom theme values are defined in `src/app/globals.css` using the `@theme` directive.

### Custom Colors
- `eerie-black`: #232323 (primary background)
- `jet`: #323232 (secondary background)
- `cultured`: #FAFAFA (text color)
- `steel-blue`: #4688B4 (accent color)
- `light-green`: #7AE485
- `middle-red`: #E28B6F

## 🌐 Pages

- **Home** (`/`) - Hero, about, stack, featured experiences, projects, hackathons, certifications, resumes
- **Experiences** (`/experiences`) - All professional experiences
- **Projects** (`/projects`) - All projects with individual detail pages
- **Contact** (`/contact`) - Contact form with Calendly integration
- **404** (`/not-found`) - Custom error page with auto-redirect

## 📦 Static Export

To generate a static export:

```bash
# Add to next.config.ts:
output: 'export'

# Then build
pnpm build
```

The static files will be in the `out/` directory.

## 🔧 Configuration

### Environment Variables

No environment variables required - all data is hardcoded.

### Google Analytics

Google Analytics ID is configured in `src/app/layout.tsx`:
```typescript
gtag('config', 'G-CY9KEWMBRR');
```

Update this ID with your own tracking ID.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

This project can be deployed to:
- **Vercel** (recommended) - Zero config deployment
- **Netlify** - Add build command: `pnpm build`
- **Any static hosting** - Use static export

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📄 License

Private - All rights reserved

## 👤 Author

**Yashvardhan Jagnani**
- Website: [jagnani73.com](https://jagnani73.com)
- GitHub: [@jagnani73](https://github.com/jagnani73)
- Twitter: [@jagnani73](https://twitter.com/jagnani73)
- LinkedIn: [yashvardhan-jagnani](https://linkedin.com/in/yashvardhan-jagnani)

---

Built with ❤️ and ☕ using Next.js
