import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function DashboardPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h4' gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ height: 200, p: 2 }}>
            <Typography variant='h6'>Analytics</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ height: 200, p: 2 }}>
            <Typography variant='h6'>Reports</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ height: 300, p: 2 }}>
            <Typography variant='h6'>Statistics</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
