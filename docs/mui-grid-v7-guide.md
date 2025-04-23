# MUI Grid v7 Migration Guide

## Key Changes in v7

The Grid component in MUI v7 has undergone significant changes in its API. Here are the correct ways to use it:

### Container Grid

```tsx
<Grid container spacing={2}>
  {/* children */}
</Grid>
```

### Grid Items

Instead of using `item` prop with `xs`, use `gridColumn` in the `sx` prop:

```tsx
// ❌ Old way (v5)
<Grid item xs={6}>
  {/* content */}
</Grid>

// ✅ New way (v7)
<Grid sx={{ gridColumn: 'span 6' }}>
  {/* content */}
</Grid>
```

### Common Patterns

For a two-column layout:

```tsx
<Grid container spacing={2}>
  <Grid sx={{ gridColumn: 'span 6' }}>{/* Left column */}</Grid>
  <Grid sx={{ gridColumn: 'span 6' }}>{/* Right column */}</Grid>
</Grid>
```

### TypeScript Notes

The Grid component in v7 no longer accepts the `item` and `xs` props directly. Instead, use the `sx` prop with `gridColumn` to define the
column span.

### Common Issues

1. If you see TypeScript errors about `item` prop not existing, you need to switch to using `sx` with `gridColumn`.
2. The `xs` prop is no longer supported directly - use `gridColumn: 'span X'` instead.
3. The component prop is only required for custom elements, not for basic grid layouts.
