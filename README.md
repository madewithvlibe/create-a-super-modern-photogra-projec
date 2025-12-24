# DP Studio - Modern Photography Portfolio

A super modern, edgy photography website with ultra-thin lines, off-beat placements, and clean black and white design aesthetic.

## Features

- Ultra-modern minimalist design with edgy, asymmetric layouts
- Ultra-thin lines (0.5px borders) throughout
- Off-beat image placements in gallery
- Smooth scroll animations and transitions
- Fully responsive design
- Contact form with Vlibe Database integration
- Clean black and white color scheme
- Custom typography with wide letter spacing

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS v3
- Vlibe Base SDK (Database)
- React 19

## Project Structure

```
├── app/
│   ├── api/
│   │   └── contact/          # Contact form API route
│   ├── globals.css           # Global styles with custom animations
│   ├── layout.tsx            # Root layout with DB initialization
│   └── page.tsx              # Main home page
├── components/
│   ├── Navigation.tsx        # Fixed navigation with scroll effects
│   ├── Hero.tsx              # Full-screen hero section
│   ├── Gallery.tsx           # Asymmetric photo gallery
│   ├── About.tsx             # About section with stats
│   ├── Contact.tsx           # Contact form
│   └── Footer.tsx            # Site footer
├── lib/
│   ├── vlibe-db.ts           # Database client singleton
│   ├── db-setup.ts           # Database initialization
│   └── vlibe-edit-mode.ts    # Vlibe Builder edit mode support
└── .env                      # Environment configuration
```

## Design Elements

### Typography
- Font weight: Extralight (200) and Light (300)
- Letter spacing: 0.15em - 0.3em for that edgy, spaced-out look
- Uppercase text for headings and navigation

### Layout
- Asymmetric grid layouts
- Off-beat positioning (offset columns, varying heights)
- Ultra-thin decorative lines (0.5px)
- Generous white space

### Color Palette
- Primary: White (#FFFFFF)
- Secondary: Black (#000000)
- Accents: Black/White at various opacities

### Animations
- Fade in up on scroll
- Smooth hover transitions
- Image scale effects on hover
- Staggered animation delays

## Database

The app uses Vlibe Database with two tables:

1. **contacts** - Stores contact form submissions
   - name (string)
   - email (string)
   - message (string)
   - status (string)
   - createdAt (number)

2. **subscribers** - Newsletter subscribers (future use)
   - email (string)
   - name (string)
   - subscribedAt (number)

## Running the App

The preview server is automatically managed by the Vlibe platform.

Access the app at: http://localhost:3000

## Key Components

### Navigation
- Fixed position with scroll-based styling
- Mobile-friendly hamburger menu
- Smooth anchor link navigation

### Hero
- Full-screen hero with background image
- Animated typography
- Scroll indicator

### Gallery
- Asymmetric 12-column grid
- 4 featured images with staggered heights
- Hover effects with scale transforms
- Intersection observer for scroll animations

### About
- Black background for contrast
- Statistics display
- Decorative grid overlay
- Number-based design element

### Contact
- Clean form design with minimal styling
- Underline-only input fields
- Real-time status feedback
- Database integration

## Customization

To customize the site:

1. Replace images in the Gallery component with your own
2. Update text content in each component
3. Modify colors in tailwind.config.js if needed
4. Adjust animations in globals.css

## Features Integration

- Vlibe Edit Mode enabled for visual editing in Builder
- Database tables auto-created on first run
- Contact form submissions stored in Vlibe Database
- Fully responsive for all screen sizes
