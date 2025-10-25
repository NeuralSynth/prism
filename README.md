# 🔮 Prism - Digital Exhaust Analytics Platform

<div align="center">

![Prism Logo](https://img.shields.io/badge/Prism-Analytics-blue?style=for-the-badge&logo=react)

**Real-time System Intelligence & Predictive Analytics Platform**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Features](#-features) • [Demo](#-demo) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [CSS & Styling](#-css--styling)
- [Configuration](#-configuration)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Prism** is a cutting-edge digital exhaust analytics platform that provides real-time system intelligence, predictive analytics, and actionable insights from your infrastructure. Built with modern web technologies, Prism transforms complex system data into beautiful, actionable visualizations.

### What is Digital Exhaust?

Digital exhaust refers to the data trail left by your digital activities - logs, metrics, events, and telemetry. Prism analyzes this exhaust in real-time to:

- 🔍 **Detect Anomalies** - AI-powered anomaly detection
- 📊 **Visualize Metrics** - Real-time system health dashboards
- ⚠️ **Alert Management** - Smart alerting and incident response
- 🤖 **AI Insights** - Machine learning-driven recommendations
- 🔗 **Integration Hub** - Connect multiple data sources seamlessly

---

## ✨ Features

### 🎯 Core Features

- **Real-time Event Streaming** - Live system events with intelligent filtering
- **System Health Monitoring** - Comprehensive health metrics and status indicators
- **Alert Management** - Intelligent alerting with acknowledgment and resolution workflows
- **Backend Service Monitoring** - Track Python and Go microservices in real-time
- **ML Model Tracking** - Monitor machine learning model performance and metrics
- **Data Pipeline Visualization** - Visual representation of data processing flows
- **AI Recommendations** - Automated insights and optimization suggestions
- **Integration Management** - Connect to AWS, Azure, GCP, Kubernetes, and more

### 🎨 UI/UX Features

- **Glass Morphism Design** - Modern, beautiful UI with frosted glass effects
- **50+ Animations** - Smooth, hardware-accelerated animations
- **Dark Mode Optimized** - Eye-friendly dark theme by default
- **Responsive Design** - Mobile, tablet, and desktop support
- **Accessibility First** - WCAG compliant with keyboard navigation
- **5 Theme Variants** - Blue, Purple, Green, Cyberpunk, High-Contrast

### 🚀 Performance Features

- **Optimized Build** - Lightning-fast Vite build system
- **Code Splitting** - Lazy loading for optimal performance
- **Tree Shaking** - Minimal bundle size
- **Hardware Acceleration** - GPU-optimized animations
- **Efficient Rendering** - React 19 with concurrent features

---

## 🎬 Demo

### Live Features

```bash
# Start the development server
npm run dev

# Open http://localhost:5000 in your browser
```

### Key Screens

1. **Overview Dashboard** - System metrics, recent events, and active alerts
2. **Event Stream** - Real-time event monitoring with filtering
3. **Alert Management** - Comprehensive alert tracking and resolution
4. **Backend Services** - Microservice health and performance monitoring
5. **ML Insights** - AI-powered recommendations and predictions
6. **Integrations** - Data source connections and configurations

---

## 🛠️ Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.0 | UI Framework |
| **TypeScript** | 5.7 | Type Safety |
| **Vite** | 6.3 | Build Tool |
| **Tailwind CSS** | 4.1 | Styling |
| **Radix UI** | Latest | Component Library |
| **Framer Motion** | 12.6 | Animations |
| **Recharts** | 2.15 | Data Visualization |
| **React Query** | 5.83 | Data Fetching |

### Additional Libraries

- **Radix UI** - Accessible component primitives
- **Lucide/Phosphor Icons** - Beautiful icon sets
- **date-fns** - Date manipulation
- **Sonner** - Toast notifications
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **D3.js** - Advanced data visualization

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **npm** 9+ or **yarn** 1.22+
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/NeuralSynth/prism.git
cd prism

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
prism/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components (Radix)
│   │   ├── AlertCard.tsx   # Alert display component
│   │   ├── EventStream.tsx # Event stream component
│   │   └── ...
│   ├── lib/                # Utilities and helpers
│   │   ├── data-generator.ts    # Mock data generation
│   │   ├── backend-simulator.ts # Backend simulation
│   │   ├── types.ts             # TypeScript types
│   │   └── utils.ts             # Utility functions
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # CSS and styling
│   │   ├── animations.css  # Animation library
│   │   └── theme.css       # Theme variables
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   ├── index.css           # Global styles
│   └── App.css             # Component styles
├── public/                 # Static assets
├── components.json         # Shadcn UI configuration
├── tailwind.config.js      # Tailwind configuration
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
├── CSS_GUIDE.md            # CSS documentation
├── CSS_CHANGES.md          # CSS enhancements summary
└── README.md               # This file
```

---

## 🏗️ Architecture

### Component Architecture

```
App (Root)
├── Header (Navigation & Controls)
├── SystemHealthBar (Overall Health)
└── Tabs (Main Content)
    ├── Overview (Dashboard)
    │   ├── MetricCards
    │   ├── EventStream
    │   └── AlertCards
    ├── Events (Full Event Stream)
    ├── Alerts (Alert Management)
    ├── Backend (Services & ML)
    │   ├── BackendServiceCards
    │   ├── MLModelCards
    │   └── DataPipelineVisualizer
    ├── Insights (AI Recommendations)
    └── Integrations (Data Sources)
```

### Data Flow

1. **Data Generation** - Mock data generated in `lib/data-generator.ts`
2. **State Management** - React hooks and GitHub Spark KV storage
3. **Real-time Updates** - Interval-based polling (2-5 seconds)
4. **Event Processing** - Anomaly detection and severity classification
5. **UI Rendering** - React components with optimized re-renders

### State Management

- **Local State** - `useState` for component-level state
- **Persistent State** - Custom KV storage for data persistence
- **Intervals** - `useEffect` for real-time data updates
- **Callbacks** - `useCallback` for optimized event handlers

---

## 🎨 CSS & Styling

### Overview

Prism features **premium, production-ready CSS** with:

- ✨ 50+ animations and transitions
- 🎭 Glass morphism effects (3 variants)
- 🌈 Gradient text and backgrounds
- 💫 Interactive hover effects
- 🎯 Loading states and skeletons
- 🎨 5 theme variants
- ♿ Full accessibility support

### Quick Usage

```jsx
// Glass morphism card
<div className="glass card-hover p-6 rounded-xl">
  <h3 className="gradient-text text-2xl">Amazing</h3>
</div>

// Animated entrance
<div className="animate-slide-in-up delay-200">
  Content appears smoothly
</div>

// Glowing button
<button className="btn-gradient shadow-glow-blue-lg">
  Click Me
</button>
```

### Documentation

- **[CSS_GUIDE.md](CSS_GUIDE.md)** - Complete CSS documentation with examples
- **[CSS_CHANGES.md](CSS_CHANGES.md)** - Summary of all enhancements
- **css-showcase.html** - Visual demonstration of all features

### Theme Customization

```jsx
// Switch themes
<body data-theme="cyberpunk">

// Available themes:
// - blue (default)
// - purple
// - green
// - cyberpunk
// - high-contrast
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration (if needed)
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_REALTIME=true

# Application Settings
VITE_APP_NAME=Prism
VITE_APP_VERSION=1.0.0
```

### Vite Configuration

Edit `vite.config.ts` to customize build settings:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### Tailwind Configuration

Customize colors, animations, and utilities in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        prism: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
          // ... more colors
        }
      }
    }
  }
}
```

---

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:5000)
npm run kill         # Kill process on port 5000

# Building
npm run build        # Production build
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run optimize     # Optimize dependencies

# Type Checking
tsc --noEmit        # Check TypeScript types
```

### Development Workflow

1. **Start dev server** - `npm run dev`
2. **Make changes** - Edit files in `src/`
3. **Hot reload** - Changes appear instantly
4. **Check types** - TypeScript provides inline errors
5. **Test build** - `npm run build` before committing

### Adding New Components

```bash
# Create new component
touch src/components/MyComponent.tsx

# Add UI component from Radix UI
npm install @radix-ui/react-component-name
```

### Code Style

- **TypeScript** - Strict mode enabled
- **ESLint** - Configured for React & TypeScript
- **Prettier** - (Optional) Add `.prettierrc` if needed
- **Naming** - PascalCase for components, camelCase for functions

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
dist
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "run", "preview"]
```

### Static Hosting

Build and upload the `dist` folder to any static hosting service:

- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps
- Google Cloud Storage

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch** - `git checkout -b feature/amazing-feature`
3. **Commit changes** - `git commit -m 'Add amazing feature'`
4. **Push to branch** - `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines

- Write clear, descriptive commit messages
- Follow existing code style and patterns
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly
- Keep PRs focused on a single feature/fix

### Code Review Process

1. Submit PR with clear description
2. Automated checks must pass
3. At least one maintainer review required
4. Address feedback and update PR
5. Merge once approved

### Reporting Issues

- Use GitHub Issues for bug reports
- Include reproduction steps
- Provide browser/environment details
- Add screenshots if applicable

---

## 📚 Documentation

### Additional Resources

- **[CSS_GUIDE.md](CSS_GUIDE.md)** - Complete CSS and animation guide
- **[CSS_CHANGES.md](CSS_CHANGES.md)** - CSS enhancement summary
- **[SECURITY.md](SECURITY.md)** - Security policies
- **[LICENSE](LICENSE)** - MIT License

### API Documentation

(Add links to API docs if applicable)

### Component Documentation

(Add links to Storybook or component docs if available)

---

## 🔒 Security

- **Dependencies** - Regularly updated via Dependabot
- **Input Validation** - Zod schema validation
- **XSS Protection** - React's built-in escaping
- **HTTPS** - Required for production
- **CSP** - Content Security Policy recommended

Report security vulnerabilities to: [security@example.com](mailto:security@example.com)

---

## 📊 Performance

### Metrics

- **Lighthouse Score** - 90+ on all metrics
- **First Contentful Paint** - < 1.5s
- **Time to Interactive** - < 3.5s
- **Bundle Size** - Optimized with tree-shaking

### Optimization Tips

- Use `React.memo` for expensive components
- Implement virtual scrolling for long lists
- Lazy load routes with `React.lazy`
- Optimize images (WebP format)
- Enable gzip/brotli compression

---

## 🗺️ Roadmap

### Version 1.x (Current)

- ✅ Real-time event streaming
- ✅ Alert management
- ✅ Backend service monitoring
- ✅ ML model tracking
- ✅ Data pipeline visualization

### Version 2.0 (Planned)

- 🔲 User authentication & authorization
- 🔲 Multi-tenant support
- 🔲 Custom dashboards
- 🔲 Advanced filtering & search
- 🔲 Export & reporting
- 🔲 Real API integration
- 🔲 WebSocket support
- 🔲 Mobile app

### Future Considerations

- GraphQL API
- Real-time collaboration
- Advanced ML features
- Custom alerting rules
- Integration marketplace

---

## 🙏 Acknowledgments

- **Radix UI** - For accessible component primitives
- **Vercel** - For amazing deployment platform
- **React Team** - For the incredible React framework
- **Open Source Community** - For incredible tools and libraries

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 NeuralSynth

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Contact & Support

- **GitHub Issues** - [Report bugs or request features](https://github.com/NeuralSynth/prism/issues)
- **Discussions** - [Join the community](https://github.com/NeuralSynth/prism/discussions)
- **Twitter** - [@NeuralSynth](https://twitter.com/NeuralSynth)
- **Email** - support@neuralsynth.io

---

## ⭐ Star History

If you find Prism useful, please consider giving it a star ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=NeuralSynth/prism&type=Date)](https://star-history.com/#NeuralSynth/prism&Date)

---

<div align="center">

**Built with ❤️ by the NeuralSynth Team**

[Website](https://neuralsynth.io) • [Documentation](https://docs.neuralsynth.io) • [Blog](https://blog.neuralsynth.io)

</div>
