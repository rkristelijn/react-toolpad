import { gql, useQuery } from '@apollo/client';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export interface ProductOrderListAppletProps {
  productId: string;
}

const GET_ORDER_ITEMS_BY_PRODUCT = gql`
  query GetOrderItemsByProduct($productId: ID!) {
    orderItemsByProduct(productId: $productId) {
      id
      productId
      quantity
      price
      product {
        id
        name
        price
      }
      orderId
    }
  }
`;

type OrderItem = {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product?: { id: string; name: string; price: number };
  orderId?: string;
};

export default function ProductOrderListApplet({ productId }: ProductOrderListAppletProps) {
  const { data, loading, error } = useQuery(GET_ORDER_ITEMS_BY_PRODUCT, {
    variables: { productId },
    skip: !productId,
  });

  const orderItems: OrderItem[] = data?.orderItemsByProduct || [];

  if (loading) return <Typography>Loading order items...</Typography>;
  if (error) return <Typography color='error'>Error loading order items: {error.message}</Typography>;

  return (
    <Box sx={{ mt: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant='h6' gutterBottom>
          Order Items Containing This Product
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Item ID</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Product Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderItems.map((item: OrderItem) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    {item.orderId ? (
                      <Link component={RouterLink} to={`/orders/${item.orderId}`} color='primary'>
                        {item.orderId}
                      </Link>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.product?.name || item.productId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
