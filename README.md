# 🚀 Modern Portfolio Template

A beautiful, responsive portfolio website template built with **Next.js 15**, **Tailwind CSS**, **Aceternity UI**, and **shadcn/ui** components.

## ✨ Features

- **Modern Design**: Clean, professional design with smooth animations
- **Fully Responsive**: Optimized for all device sizes
- **Dark/Light Mode**: Built-in theme switching support
- **Performance Optimized**: Built with Next.js 15 for maximum speed
- **Accessible**: Following WCAG guidelines for accessibility
- **SEO Ready**: Optimized for search engines
- **Type Safe**: Built with TypeScript

## 🏗️ Sections Included

### 🎯 Hero Section
- Eye-catching introduction with animated typewriter effect
- Professional greeting with call-to-action buttons
- Smooth scroll indicators

### 👤 About Section
- Personal introduction and background
- Key highlights and values
- Statistics and achievements
- Personal interests and hobbies

### 🛠️ Skills Section  
- Categorized skills with progress indicators
- Technology badges with hover effects
- Currently learning section

### 💼 Projects Section
- Featured projects showcase
- Project cards with hover effects
- Technology stack badges
- Live demo and GitHub links
- Additional projects grid

### 💻 Experience Section
- Professional timeline
- Detailed job descriptions and achievements
- Education background
- Certifications and credentials
- Downloadable resume option

### 📞 Contact Section
- Contact form with validation
- Contact information display
- Social media links
- Professional call-to-action

### 🔗 Footer
- Quick navigation links
- Social media connections
- Professional information

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🎨 Customization Guide

### 1. Personal Information

**Update Hero Section** (`src/components/sections/hero.tsx`):
```tsx
// Replace with your information
<h1>Your Name Here</h1>
const words = [
  { text: "Building" },
  { text: "exceptional" },
  { text: "digital" },
  { text: "experiences", className: "text-blue-500" },
];
```

**Update About Section** (`src/components/sections/about.tsx`):
```tsx
// Update personal description, stats, and interests
<Badge variant="secondary">X years</Badge> // Replace X with your experience
```

### 2. Skills & Technologies

**Update Skills** (`src/components/sections/skills.tsx`):
```tsx
const skillCategories = [
  {
    category: "Frontend",
    skills: [
      { name: "React/Next.js", level: 90, icon: "⚛️" },
      // Add your skills here
    ]
  }
];

const technologies = [
  "React", "Next.js", // Add your technologies
];
```

### 3. Projects

**Update Projects** (`src/components/sections/projects.tsx`):
```tsx
const projects = [
  {
    title: "Your Project Title",
    description: "Project description",
    image: "/path/to/your/image.jpg",
    technologies: ["Tech1", "Tech2"],
    githubUrl: "https://github.com/yourusername/project",
    liveUrl: "https://your-project.com",
    featured: true
  }
];
```

### 4. Experience

**Update Experience** (`src/components/sections/experience.tsx`):
```tsx
const experiences = [
  {
    title: "Your Job Title",
    company: "Company Name",
    location: "Location",
    period: "2020 - Present",
    // Add your experience details
  }
];
```

### 5. Contact Information

**Update Contact Details** (`src/components/sections/contact.tsx`):
```tsx
const contactInfo = [
  {
    icon: MailIcon,
    label: "Email",
    value: "your.email@domain.com",
    href: "mailto:your.email@domain.com"
  }
];
```

### 6. Navigation

**Update Navbar** (`src/components/navbar-demo.tsx`):
- Logo/brand name
- Navigation buttons text

**Update Footer** (`src/components/sections/footer.tsx`):
- Personal information
- Social media links
- Professional details

## 🎯 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist folder to Netlify
```

### Other Platforms
The built application works on any static hosting service.

## 🛠️ Technologies Used

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui + Aceternity UI
- **Animations**: Framer Motion
- **Icons**: Lucide React + Tabler Icons
- **Typography**: Geist Font
- **Language**: TypeScript

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── skills.tsx
│   │   ├── projects.tsx
│   │   ├── experience.tsx
│   │   ├── contact.tsx
│   │   └── footer.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   └── navbar-demo.tsx
└── lib/
    └── utils.ts
```

## 🎨 Color Customization

Update the color scheme in `src/app/globals.css`:

```css
:root {
  --primary: oklch(0.21 0.006 285.885); /* Your primary color */
  --secondary: oklch(0.967 0.001 286.375); /* Your secondary color */
  /* Add more custom colors */
}
```

## 📱 Responsive Design

The template is fully responsive with breakpoints:
- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💡 Tips for Customization

1. **Images**: Replace placeholder images with your actual project screenshots
2. **Content**: Update all text content to reflect your experience and projects
3. **Colors**: Customize the color scheme to match your brand
4. **Animations**: Adjust animation timings in motion components
5. **SEO**: Update meta tags in `layout.tsx` for better SEO

## 📞 Support

If you have any questions or need help customizing the template, feel free to:
- Open an issue on GitHub
- Contact me directly
- Check the documentation

---

**Happy coding! 🚀**

*Built with ❤️ using modern web technologies*
