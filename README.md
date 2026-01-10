# Portfolio Website

A modern, responsive portfolio website built with Next.js 15, featuring smooth animations, a blog section, and an elegant dark theme. Showcases projects, experience, skills, and technical writing.

## ✨ Features

- **Modern UI/UX**: Clean, minimalist design with smooth animations powered by Framer Motion
- **Responsive Design**: Fully responsive layout that works seamlessly on all devices
- **Dark Theme**: Beautiful dark theme with glassmorphism effects and backdrop blur
- **Blog/Writing Section**: Full-featured blog with article listing, search functionality, and individual article pages
- **Interactive Animations**: Scroll-triggered animations, loading screens, and interactive components
- **Project Showcase**: Dynamic project gallery with filtering and detailed project cards
- **Contact Form**: Integrated contact form with EmailJS
- **Performance Optimized**: Built with Next.js 15 for optimal performance and SEO
- **Loading Screen**: Custom loading screen with progress animation on first visit

## 🛠 Tech Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript/JavaScript]** - Programming language

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon collection

### Additional Libraries
- **next-themes** - Theme management
- **react-hook-form** - Form handling
- **EmailJS** - Contact form integration
- **sonner** - Toast notifications
- **SWR** - Data fetching
- **date-fns** - Date utilities
- **nextjs-toploader** - Navigation progress indicator

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── (home)/
│   │   ├── components/          # Home page components
│   │   │   ├── HeroSection.jsx
│   │   │   ├── AboutMe.jsx
│   │   │   ├── SkillsShowcase.jsx
│   │   │   ├── CodePhilosophy.jsx
│   │   │   ├── ProcessSection.jsx
│   │   │   ├── QuoteSection.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Education.jsx
│   │   │   └── GithubProjects.jsx
│   │   └── page.jsx             # Home page
│   ├── (projects)/
│   │   └── projects/            # Projects page
│   ├── (writing)/
│   │   └── writing/             # Blog/Writing section
│   │       ├── page.jsx         # Article listing
│   │       ├── articles-data.js # Article data
│   │       └── [slug]/
│   │           └── page.jsx     # Individual article pages
│   ├── (contact)/
│   │   └── contact/             # Contact page
│   ├── layout.js                # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── Header/                  # Navigation header
│   ├── Footer/                  # Footer component
│   ├── ui/                      # Reusable UI components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── loading-screen.jsx
│   │   └── ...
│   └── Providers/               # Context providers
├── config.js                    # Site configuration
├── lib/
│   └── utils.js                 # Utility functions
└── public/                      # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/muhammadadil0/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # EmailJS Configuration (for contact form)
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   
   # Add other environment variables as needed
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Update Personal Information

Edit the `config.js` file to update:
- Personal information
- Social media links
- Navigation items
- Projects
- Experience
- Education
- Skills

### Add/Modify Articles

Articles are stored in `app/(writing)/writing/articles-data.js`. Simply add new article objects to the `articles` array:

```javascript
{
    slug: 'your-article-slug',
    title: 'Your Article Title',
    description: 'Article description',
    date: '2024-01-01',
    readTime: 5,
    tags: ['Tag1', 'Tag2'],
    image: 'https://your-image-url.com/image.jpg',
    content: {
        introduction: 'Introduction text',
        sections: [
            {
                heading: 'Section Heading',
                content: 'Section content...'
            }
        ]
    }
}
```

### Styling

The project uses Tailwind CSS. You can customize:
- Colors in `tailwind.config.js`
- Global styles in `app/globals.css`
- Component-specific styles using Tailwind utility classes

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run spotify-auth` - Spotify authentication helper (if configured)

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

The site will be automatically deployed on every push to the main branch.

### Other Platforms

This Next.js application can be deployed on any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🔧 Configuration

### Image Optimization

The project is configured to load images from Unsplash. To add more image sources, update `next.config.mjs`:

```javascript
images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            pathname: '/**',
        },
        // Add more patterns as needed
    ],
}
```

### Theme Configuration

The dark theme is configured in `components/Providers/Theme.js`. You can customize theme colors and behavior there.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/muhammadadil0/portfolio/issues).

## 👤 Author

**Muhammad Adil**

- Portfolio: [https://adilportfolio-tawny.vercel.app](https://adilportfolio-tawny.vercel.app)
- GitHub: [@muhammadadil0](https://github.com/muhammadadil0)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

⭐ If you found this project helpful, please give it a star!
