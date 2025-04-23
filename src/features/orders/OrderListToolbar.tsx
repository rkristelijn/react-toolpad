import { Refresh } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

interface OrderListToolbarProps {
  onRefresh: () => void;
}

export function OrderListToolbar({ onRefresh }: OrderListToolbarProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
      <Button startIcon={<Refresh />} onClick={onRefresh}>
        Refresh
      </Button>
    </Box>
  );
}
