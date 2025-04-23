# React Toolpad Project

## What is it?

A modern React application that demonstrates a flexible data view system with sorting, filtering, grouping, and pagination capabilities. It
supports multiple rendering options (tables, cards, etc.) and persists settings in the URL for easy sharing and navigation.

## Features

- 📊 Flexible data visualization
- 🔍 Advanced filtering and sorting
- 📱 Responsive design
- 🎨 Material-UI components
- 🔒 TypeScript support
- 📝 ESLint and Prettier configuration
- 🔄 URL-based state persistence

## Development Setup

### Prerequisites

- Node.js (v18 or newer)
- npm (v8 or newer) or yarn (v1.22 or newer)
- Git

### Quick Start

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

### Code Style & Linting

This project uses ESLint and Prettier for code formatting and linting. The configuration ensures:

- Consistent code style across the project
- Import ordering
- TypeScript type checking
- React best practices

#### Key Rules

1. **Imports Order**:

   ```typescript
   // External dependencies
   import { useState } from 'react';

   // Material-UI imports
   import { Box, Typography } from '@mui/material';

   // Internal imports
   import { useMyHook } from './hooks';
   ```

2. **TypeScript**:

   - Explicit types for function parameters
   - No implicit any
   - Strict null checks

3. **Code Formatting**:
   - Single quotes for strings and JSX attributes
   - 2 spaces for indentation
   - 100 characters line length
   - Trailing commas in objects and arrays
   - Semicolons required

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESLint to check code quality
- `npm run format` - Formats code using Prettier

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

### VS Code / Cursor Settings

The `.vscode/settings.json` configures:

- Format on save
- ESLint auto-fix on save
- Prettier as default formatter

### Common Issues & Solutions

1. **Import Order Issues**:

   ```typescript
   // ❌ Wrong
   import { useState } from 'react';
   import Box from '@mui/material/Box';
   import { useMyHook } from './hooks';

   // ✅ Correct
   import { useState } from 'react';

   import { Box } from '@mui/material';

   import { useMyHook } from './hooks';
   ```

2. **JSX Quotes**:

   ```typescript
   // ❌ Wrong
   <Button variant="contained">

   // ✅ Correct
   <Button variant='contained'>
   ```

3. **TypeScript Types**:

   ```typescript
   // ❌ Wrong
   function handleClick(event) {

   // ✅ Correct
   function handleClick(event: React.MouseEvent) {
   ```

## Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](https://mui.com/)
- [React Router](https://reactrouter.com/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Documentation

For detailed documentation, please visit our [docs](./docs/) directory:

- [Getting Started](./docs/getting-started.md)
- [Architecture](./docs/architecture.md)
- [Components](./docs/components.md)
- [Data Management](./docs/data-management.md)
- [Styling](./docs/styling.md)
- [Deployment](./docs/deployment.md)

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct and the process for
submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

# Cursor Development Guidelines

## Before Completing Any Task

1. **Linting Checks**

   - Always check for linting errors in the Problems tab
   - Common issues to watch for:
     - Unused imports
     - Missing type definitions
     - Unused variables
     - Incorrect prop types
     - Missing dependencies in useEffect
   - Fix ALL linting errors before considering a task complete

2. **Type Safety**

   - Ensure all TypeScript types are properly defined
   - Avoid using `any` type
   - Use proper generics for API responses and queries

3. **Code Organization**

   - Follow the feature module pattern
   - Keep components focused and single-responsibility
   - Use proper file naming conventions

4. **Testing**
   - Write tests for new functionality
   - Update existing tests when modifying code
   - Ensure all tests pass before completing task

## Common Linting Rules

1. **Import Rules**

   ```typescript
   // ❌ Bad - unused imports
   import { Box, Alert, Paper } from '@mui/material';

   // ✅ Good - only import what you use
   import { Box, Paper } from '@mui/material';
   ```

2. **Type Definitions**

   ```typescript
   // ❌ Bad - missing type definitions
   function useData(id) {
     const [data, setData] = useState();
   }

   // ✅ Good - proper type definitions
   function useData(id: string) {
     const [data, setData] = useState<DataType | null>(null);
   }
   ```

3. **React Props**

   ```typescript
   // ❌ Bad - implicit any props
   function Component(props) {
     return <div>{props.name}</div>;
   }

   // ✅ Good - explicit prop types
   interface ComponentProps {
     name: string;
   }

   function Component({ name }: ComponentProps) {
     return <div>{name}</div>;
   }
   ```

## Pre-Commit Checklist

1. Run `npm run lint` to check for linting errors
2. Fix any TypeScript errors
3. Ensure all tests pass
4. Check for unused imports and variables
5. Verify proper type definitions
6. Review component prop types
