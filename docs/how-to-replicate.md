# Detailed documentation for this repo

This document describes how to regenerate this app

## (re)Creating this app

```sh
# npx create-react-app react-toolpad-grid-or-cards # no typescript
npx create-react-app react-toolpad --template typescript
```

### Cleanup
```
## Remove logo
rm src/logo.svg src/index.css src/App.css
## Remove import
sed -i '' '3d' src/index.tsx
## Simplify App
echo 'const App = () => {
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;' > src/App.tsx
```


### Add toolpad

https://mui.com/toolpad/core/introduction/installation/

```sh
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

### Add router

Based on my research of both React Router and TanStack Router, along with MUI Toolpad's integration capabilities, here's my recommendation:

For this project, I recommend using React Router for the following reasons:
- Official MUI Toolpad Core Support: MUI Toolpad Core has built-in integration for React Router through its ReactRouterAppProvider component. This means you'll get seamless integration with Toolpad's dashboard layout, navigation, and other UI components.
- Documentation and Examples: Toolpad provides comprehensive documentation specifically for React Router integration, including examples for nested routes, which is what you're looking to implement.
- Stability and Maturity: React Router is a mature, well-established routing solution with a large community and extensive documentation.
- Simpler Learning Curve: If you're already familiar with React Router, sticking with it will be more straightforward.
While TanStack Router offers excellent type safety and some advanced features like powerful search param handling, it doesn't have official integration with MUI Toolpad Core yet. According to the GitHub issues, there's even a feature request (#4629) to add TanStack Router support, which indicates it's not officially supported at this time.

https://react.dev/learn/build-a-react-app-from-scratch#routing

## todo replace webpack with vite


