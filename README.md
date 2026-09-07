# Ankit Kumar — Full-Stack Web Developer Portfolio

A premium, production-quality personal portfolio and freelance business website built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Premium dark-themed design** with glassmorphism, gradients, and smooth Framer Motion animations
- **Fully responsive** across all viewport sizes (320px to 1440px+)
- **Working contact form** that saves project enquiries to a Supabase database
- **Protected admin dashboard** at `/admin` for managing enquiries
- **Interactive project portfolio** with filtering and detailed modals
- **Service cards** that auto-fill the contact form's project type field
- **SEO optimized** with Open Graph, Twitter cards, and semantic HTML
- **Accessible** with keyboard navigation, focus states, ARIA labels, and reduced-motion support
- **No fake testimonials, statistics, or invented contact information**

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend/Database/Auth:** Supabase (PostgreSQL)
- **Routing:** React Router DOM
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

The dev server starts automatically. Open the URL shown in your terminal.

### Build for Production

```bash
npm run build
```

### Type Check

```bash
npm run typecheck
```

## Supabase Configuration

Supabase environment variables are pre-populated in `.env`:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Table

The `project_enquiries` table is already created with the following columns:

| Column         | Type         | Description                                      |
|----------------|--------------|--------------------------------------------------|
| id             | uuid (PK)    | Auto-generated unique ID                         |
| name           | text         | Client's name                                    |
| email          | text         | Client's email                                    |
| project_type   | text         | Type of project requested                        |
| budget         | text         | Budget range selected                             |
| message        | text         | Project description from client                   |
| status         | text         | Enquiry status (New, Contacted, Completed, Archived) |
| created_at      | timestamptz  | When the enquiry was submitted                    |

### Row Level Security (RLS)

- **Public (anon):** Can INSERT new enquiries only (for the contact form)
- **Authenticated (admin):** Can SELECT, UPDATE, and DELETE enquiries

This means only someone logged into the admin dashboard can read or manage enquiries. The public can only submit new ones.

## Creating the Admin User

To access the admin dashboard at `/admin`, you need to create an admin user in Supabase:

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication → Users**
4. Click **Add user → Create new user**
5. Enter an email and password
6. Make sure **Auto Confirm User** is enabled (email confirmation is OFF by default)
7. Click **Create user**

Now you can log in at `/admin` with those credentials to view and manage project enquiries.

## Environment Variables

| Variable                  | Description                          | Required |
|---------------------------|--------------------------------------|----------|
| `VITE_SUPABASE_URL`       | Your Supabase project URL            | Yes      |
| `VITE_SUPABASE_ANON_KEY`  | Your Supabase anon/public key        | Yes      |

> **Never** expose the Supabase service role key in frontend code. It is only for server-side use.

## Where to Replace Placeholders

### Social Media Links

File: `src/data/portfolio.ts`

Find the `SOCIAL_LINKS` object and replace the placeholder values:

```typescript
export const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  fiverr: 'https://fiverr.com/yourusername',
  upwork: 'https://upwork.com/freelancers/yourusername',
};
```

### Project URLs

File: `src/data/portfolio.ts`

In the `PROJECTS` array, replace the placeholder URLs for each project:

- `MEDICAL_SHOP_LIVE_URL` → your live demo URL
- `MEDICAL_SHOP_GITHUB_URL` → your GitHub repo URL
- `VIDYA_CLASSES_LIVE_URL` → your live demo URL
- `VIDYA_CLASSES_GITHUB_URL` → your GitHub repo URL
- `TOY_SHOP_LIVE_URL` → your live demo URL
- `TOY_SHOP_GITHUB_URL` → your GitHub repo URL
- `JOB_PORTAL_LIVE_URL` → your live demo URL
- `JOB_PORTAL_GITHUB_URL` → your GitHub repo URL
- `GRAM_SAHAYAK_LIVE_URL` → your live demo URL
- `GRAM_SAHAYAK_GITHUB_URL` → your GitHub repo URL

### Project Screenshots

Replace the SVG placeholder images in `public/projects/` with real screenshots:

- `public/projects/medical-shop.svg` → `medical-shop.png` (or update the path in `portfolio.ts`)
- `public/projects/vidya-classes.svg` → `vidya-classes.png`
- `public/projects/toy-shop.svg` → `toy-shop.png`
- `public/projects/job-portal.svg` → `job-portal.png`
- `public/projects/gram-sahayak.svg` → `gram-sahayak.png`

Update the `image` field in each project's data to match the new file path.

### Resume PDF

Place your resume PDF at:

```
public/resume/Ankit-Kumar-Resume.pdf
```

The "Download Resume" button in the navigation links to `/resume/Ankit-Kumar-Resume.pdf`.

### Contact Email

File: `src/sections/Contact.tsx`

Find the placeholder text `[Your email will be added here]` and replace it with your real email address.

## Deploying to Vercel

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **New Project** and import your repository
4. Vercel auto-detects Vite — the default settings work:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add environment variables in Vercel's project settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click **Deploy**

### SPA Routing on Vercel

Since this app uses client-side routing (`/admin` route), add a `vercel.json` file in the project root:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

This ensures direct navigation to `/admin` works without a 404.

## Project Structure

```
src/
  components/      # Reusable UI components (Navbar, Footer, Modal, etc.)
  sections/         # Page sections (Hero, About, Skills, Services, Projects, etc.)
  pages/            # Route pages (Home, Admin, AdminLogin, AdminDashboard)
  data/             # Portfolio data (projects, services, skills, social links)
  hooks/            # Custom React hooks (useAuth, useScrollPosition)
  lib/              # Library setup (Supabase client)
  types/            # TypeScript type definitions
  utils/            # Utility functions (scroll helper)
```

## Admin Dashboard

Visit `/admin` to access the protected admin dashboard.

- **Login:** Uses Supabase email/password authentication
- **Dashboard shows:**
  - Total enquiries count
  - New enquiries count
  - Full enquiry table with name, email, project type, budget, message, date, and status
- **Admin actions:**
  - View full enquiry details in a modal
  - Update enquiry status (New → Contacted → Completed → Archived)
  - Delete enquiries
- Unauthenticated users see only the login screen

## License

© 2026 Ankit Kumar. All rights reserved.
