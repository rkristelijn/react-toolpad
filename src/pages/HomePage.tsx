import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function HomePage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Toolpad
      </Typography>
      <Typography variant="body1">
        This is the home page of your application.
      </Typography>
    </Box>
  );
}