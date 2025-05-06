# Google Meet Clone

A modern video conferencing application built with React, TypeScript, and Vite, inspired by Google Meet.

## Features

- 🎥 Video conferencing interface
- 👥 Meeting management
- 🔒 Secure video calls
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Material Icons

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clone-google-meet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── header/         # Header component with navigation
│   ├── leftBar/        # Left sidebar navigation
│   └── homeContent/    # Main home page content
├── pages/
│   ├── HomePage/       # Home page component
│   └── meeting/        # Meeting page component
├── App.tsx            # Main application component
└── main.tsx          # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Development

### Adding New Features

1. Create new components in the `src/components` directory
2. Add new pages in the `src/pages` directory
3. Update routes in `App.tsx` if adding new pages

### Styling

This project uses Tailwind CSS for styling. To add new styles:
1. Use Tailwind utility classes directly in components
2. For custom styles, add them to the respective component's CSS file

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Meet for inspiration
- React and Vite teams for the amazing tools
- Tailwind CSS for the utility-first CSS framework
