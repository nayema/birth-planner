# Birth Planner

A modern birth planning web application built with Next.js that helps expectant parents create personalized birth preference plans.

## Features

- 🎯 **4 Stages of Planning**: Labour, Birthing, Placenta, and Newborn care preferences
- ✅ **Easy Selection**: Checkbox-based preference selection with icons
- 📄 **PDF Generation**: Download your birth plan as a beautifully formatted PDF
- 🎨 **Modern Design**: Clean, intuitive interface designed for millennial and Gen-Z parents
- 📱 **Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed

### Installation

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This app is deployed on Vercel. Visit the live site:

**[🔗 Live Demo](https://your-app-name.vercel.app)**

### Deploy Your Own

The easiest way to deploy this Next.js app is to use [Vercel](https://vercel.com):

1. Push your code to GitHub (already done!)
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your `birth-planner` repository
4. Vercel will automatically detect Next.js and deploy
5. Your app will be live in minutes!

**Other free hosting options:**
- [Netlify](https://www.netlify.com/) - Also excellent for Next.js
- [Railway](https://railway.app/) - Simple deployment platform
- [Render](https://render.com/) - Free tier available

## Project Structure

```
birth-planner/
├── app/              # Next.js app router pages
├── components/       # Reusable React components
├── lib/              # Utilities and state management
├── types/            # TypeScript type definitions
└── public/           # Static assets
```

## Customization

Preferences and icons can be easily edited in `/lib/preferences.ts`. Each preference includes:
- `id`: Unique identifier
- `label`: Display text
- `icon`: Lucide React icon name (easily replaceable)
- `checked`: Default state

## License

MIT
