# AI Engineer Challenge - Frontend

A modern React frontend application built with TypeScript, Tailwind CSS, and Vite for the AI Engineer Challenge.

## Features

- ⚡ **Vite** - Lightning fast development server
- ⚛️ **React 18** - Latest React with hooks and concurrent features
- 🔷 **TypeScript** - Type safety and better developer experience
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧭 **React Router** - Client-side routing
- 📱 **Responsive Design** - Mobile-first approach
- 🎯 **Modern UI** - Clean and professional interface

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Linting**: ESLint

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

Create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check for code quality issues:

```bash
npm run lint
```

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   └── Layout.tsx     # Main layout component
│   ├── pages/             # Page components
│   │   ├── Home.tsx       # Home page
│   │   ├── About.tsx      # About page
│   │   └── Contact.tsx    # Contact page
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Update the navigation in `src/components/Layout.tsx`

### Styling

The application uses Tailwind CSS for styling. You can:

- Modify `tailwind.config.js` to customize the design system
- Add custom styles in `src/index.css`
- Use Tailwind utility classes in components

### Adding Dependencies

```bash
npm install package-name
```

For TypeScript types (if needed):
```bash
npm install -D @types/package-name
```

## Contributing

1. Make your changes
2. Run `npm run lint` to check code quality
3. Test your changes with `npm run dev`
4. Build to ensure everything works: `npm run build`

## License

This project is part of the AI Engineer Challenge.