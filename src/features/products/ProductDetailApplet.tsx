import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';

import type { SxProps, Theme } from '@mui/material/styles';

import { useProduct } from './product-service';

export interface ProductDetailAppletProps {
  productId: string;
  className?: string;
  sx?: SxProps<Theme>;
}

export default function ProductDetailApplet({ productId, className, sx }: ProductDetailAppletProps) {
  const { product, loading, error } = useProduct(productId);

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color='error' p={2}>
        Error loading product: {error.message}
      </Typography>
    );
  }

  if (!product) {
    return (
      <Typography color='text.secondary' p={2}>
        Product not found
      </Typography>
    );
  }

  return (
    <Card className={className} sx={sx}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Typography variant='h5' gutterBottom>
              {product.name}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant='body1' color='text.secondary' paragraph>
              {product.description}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant='subtitle2' color='text.secondary'>
              Price
            </Typography>
            <Typography variant='h6' color='primary'>
              ${product.price.toFixed(2)}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant='subtitle2' color='text.secondary'>
              Stock
            </Typography>
            <Typography variant='h6' color={product.stock > 10 ? 'success.main' : 'warning.main'}>
              {product.stock} units
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant='subtitle2' color='text.secondary'>
              Product ID
            </Typography>
            <Typography variant='body2'>{product.id}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
