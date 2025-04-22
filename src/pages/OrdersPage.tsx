import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useState } from "react";

interface Order {
  id: string;
  customer: string;
  date: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  total: number;
}

export default function OrderPage() {
  const [orders] = useState<Order[]>([
    {
      id: "ORD001",
      customer: "John Doe",
      date: "2024-03-15",
      status: "pending",
      total: 299.99,
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      date: "2024-03-14",
      status: "completed",
      total: 199.99,
    },
    {
      id: "ORD003",
      customer: "Bob Johnson",
      date: "2024-03-13",
      status: "processing",
      total: 499.99,
    },
  ]);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "warning.main";
      case "processing":
        return "info.main";
      case "completed":
        return "success.main";
      case "cancelled":
        return "error.main";
      default:
        return "text.primary";
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h4">Orders</Typography>
            <Button variant="contained" color="primary">
              New Order
            </Button>
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            color: getStatusColor(order.status),
                            textTransform: "capitalize",
                          }}
                        >
                          {order.status}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        ${order.total.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        <Button size="small" sx={{ mr: 1 }}>
                          View
                        </Button>
                        <Button size="small" color="error">
                          Cancel
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
