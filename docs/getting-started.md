# Getting Started

## Prerequisites
- Node.js (v18 or newer)
- npm (v8 or newer) or yarn (v1.22 or newer)
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/react-toolpad.git
   cd react-toolpad
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESLint to check code quality
- `npm run format` - Formats code using Prettier

### Code Style

This project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

The configuration files are:
- `.eslintrc.js` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `tsconfig.json` - TypeScript configuration

### Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── services/      # API and data services
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
├── App.tsx        # Main application component
└── index.tsx      # Application entry point
```

## Next Steps

- Read the [Architecture](./architecture.md) guide to understand the project structure
- Check out the [Components](./components.md) documentation to learn about available UI components
- Review the [Data Management](./data-management.md) guide for information about state management
- See the [Styling](./styling.md) guide for details about the theming system
- Read the [Deployment](./deployment.md) guide for production deployment instructions 