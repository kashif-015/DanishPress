# DanishPress - Wedding Invitation Cards Printing Shop

## Project Overview
A mobile-first, professional, app-like website for a printing shop that showcases wedding invitation cards with Hindu and Muslim categories.

## Tech Stack
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Authentication, Storage, APIs)
- **UI**: Framer Motion for animations, Swiper for carousels
- **Deployment**: Vercel (free tier)

## Key Features
- Mobile-first responsive design with app-like experience
- Two main filters: Hindu Cards and Muslim Cards
- Swipeable image carousels (4-5 images per card)
- Availability badges: Available, Limited, Unavailable
- WhatsApp enquiry with auto-filled card details
- Secure admin panel with full CRUD operations
- Image upload and reorder functionality

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page with card grid
│   ├── card/[id]/         # Card detail page
│   ├── admin/             # Admin panel pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── cards/            # Card-related components
│   └── admin/            # Admin-specific components
├── lib/                   # Utilities and configurations
│   ├── supabase/         # Supabase client and helpers
│   └── utils/            # Helper functions
└── types/                # TypeScript type definitions
```

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
