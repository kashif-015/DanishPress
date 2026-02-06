# DanishPress - Wedding Invitation Cards

A mobile-first, professional website for a printing shop that showcases beautiful wedding invitation cards with Hindu and Muslim categories.

![DanishPress](https://via.placeholder.com/800x400/e15f4d/ffffff?text=DanishPress)

## ✨ Features

### Customer Features
- 📱 **Mobile-first design** with app-like experience
- 🏷️ **Category filters** for Hindu and Muslim cards
- 🖼️ **Swipeable image carousels** (4-5 images per card)
- 🟢 **Availability badges** (Available, Limited, Unavailable)
- 💬 **WhatsApp enquiry** with auto-filled card details
- 🔍 **Card detail pages** with zoom functionality
- 📤 **Share cards** via native share or copy link
- 🚀 **Fast and smooth animations**

### Admin Features
- 🔐 **Secure login** with Supabase Auth
- 📋 **Card management** (Create, Read, Update, Delete)
- 📸 **Image upload** with drag-and-drop reordering
- ⭐ **Featured cards** highlighting
- 📦 **Duplicate cards** for quick creation
- 📊 **Dashboard stats** (total cards, enquiries)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Auth, Storage)
- **UI**: Framer Motion, Swiper, Lucide Icons
- **Deployment**: Vercel (free tier)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### 1. Clone and Install

```bash
cd DanishPress
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)

2. Run the database schema:
   - Go to SQL Editor in your Supabase dashboard
   - Copy the contents of `supabase/schema.sql`
   - Run the SQL commands

3. Create a storage bucket:
   - Go to Storage in your Supabase dashboard
   - Click "New bucket"
   - Name: `card-images`
   - Make it **public**
   - Add storage policies as described in `supabase/schema.sql`

4. Create an admin user:
   - Go to Authentication > Users
   - Click "Add user"
   - Enter email and password for admin access

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

Get your Supabase URL and anon key from:
- Project Settings > API > Project URL
- Project Settings > API > Project API keys (anon/public)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page with card grid
│   ├── card/[id]/         # Card detail page
│   ├── about/             # About page
│   ├── admin/             # Admin panel
│   │   ├── login/         # Admin login
│   │   └── dashboard/     # Admin dashboard
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Base UI components
│   ├── cards/             # Card display components
│   ├── layout/            # Header, BottomNav
│   └── admin/             # Admin components
├── lib/
│   ├── supabase/          # Supabase clients
│   └── utils.ts           # Helper functions
└── types/                 # TypeScript types
```

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

The site will be live at `your-project.vercel.app`

## 📱 Screenshots

### Customer View
- Home page with filterable card grid
- Card detail page with swipeable images
- WhatsApp enquiry integration

### Admin Panel
- Secure login
- Dashboard with stats
- Card management with image reordering

## 🔧 Configuration

### WhatsApp Number
Update `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` with your WhatsApp Business number (format: country code + number, no spaces or +).

### Customize Colors
Edit `tailwind.config.ts` to change the primary color scheme:

```ts
colors: {
  primary: {
    500: "#your-color",
    // ... other shades
  },
}
```

## 📝 License

MIT License - feel free to use this for your own printing business!

## 🤝 Support

For support or custom development, contact via WhatsApp or open an issue.

---

Built with ❤️ for DanishPress
