# Detailed documentation for this repo

## (re)Creating this app

```sh
# npx create-react-app react-toolpad-grid-or-cards # no typescript
npx create-react-app react-toolpad --template typescript
```

### Cleanup
```
## Remove logo
rm src/logo.svg src/index.css App.css
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
npm install @mui/material @mui/icons-material @emotion/react @emotion/**styled**
```

