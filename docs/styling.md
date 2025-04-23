# Styling Guide

This document outlines the styling system used in the application.

## Technology Stack

- Material-UI (MUI) for component library
- Emotion for CSS-in-JS
- Custom theme configuration
- Responsive design utilities

## Theme Configuration

### Colors

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ed6c02',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#2e7d32',
    },
  },
});
```

### Typography

```typescript
const theme = createTheme({
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    // ... other variants
  },
});
```

## Component Styling

### Using MUI's sx Prop

```typescript
<Box
  sx={{
    p: 2,
    display: 'flex',
    gap: 2,
    alignItems: 'center',
    borderRadius: 1,
    bgcolor: 'background.paper',
  }}
>
  {/* Component content */}
</Box>
```

### Custom Styled Components

```typescript
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  transition: theme.transitions.create(['box-shadow']),
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));
```

## Responsive Design

### Breakpoints

```typescript
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
```

### Media Queries

```typescript
const ResponsiveComponent = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));
```

## Layout System

### Grid System

```typescript
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    {/* Content */}
  </Grid>
</Grid>
```

### Spacing

```typescript
const theme = createTheme({
  spacing: (factor: number) => `${0.25 * factor}rem`,
});
```

## Best Practices

1. **Theme Usage**

   - Use theme values instead of hard-coded values
   - Maintain consistent spacing using theme.spacing
   - Use palette colors for consistency
   - Implement dark mode support

2. **Component Styling**

   - Keep styles close to components
   - Use styled components for complex styles
   - Implement proper style inheritance
   - Follow BEM-like naming for custom classes

3. **Responsive Design**

   - Mobile-first approach
   - Use breakpoints consistently
   - Test on multiple devices
   - Implement proper fallbacks

4. **Performance**

   - Minimize CSS-in-JS overhead
   - Use proper caching
   - Implement code splitting
   - Optimize bundle size

5. **Maintainability**
   - Document custom styles
   - Use consistent naming
   - Implement style guide
   - Regular style audits

## Common Patterns

### Cards

```typescript
const CardWrapper = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));
```

### Forms

```typescript
const FormWrapper = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  maxWidth: '600px',
  margin: '0 auto',
}));
```

### Lists

```typescript
const ListWrapper = styled('div')(({ theme }) => ({
  '& > *:not(:last-child)': {
    marginBottom: theme.spacing(2),
  },
}));
```

## Accessibility

1. **Color Contrast**

   - Meet WCAG guidelines
   - Test with color blindness tools
   - Provide sufficient contrast
   - Use semantic colors

2. **Focus States**

   - Visible focus indicators
   - Consistent focus styles
   - Keyboard navigation support
   - Focus trap for modals

3. **Typography**
   - Readable font sizes
   - Proper line height
   - Sufficient color contrast
   - Responsive text sizing
