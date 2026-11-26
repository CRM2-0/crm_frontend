import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  Alert,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PageHeader from "@/components/common/PageHeader";
import ServerTablePagination from "@/components/table/ServerTablePagination";
import {
  fetchCustomers,
  selectCustomerError,
  selectCustomerPagination,
  selectCustomers,
  selectCustomerStatus,
  setLimit,
  setPage,
} from "../customerSlice";

export default function CustomerListPage() {
  const dispatch = useDispatch();
  const customers = useSelector(selectCustomers);
  const pagination = useSelector(selectCustomerPagination);
  const status = useSelector(selectCustomerStatus);
  const error = useSelector(selectCustomerError);
  useEffect(() => {
    const request = dispatch(fetchCustomers(pagination));
    return () => request.abort();
  }, [dispatch, pagination.page, pagination.limit]);
  return (
    <>
      <PageHeader
        title="Customers"
        action={
          <Button
            component={Link}
            to="/customers/new"
            variant="contained"
            startIcon={<AddRoundedIcon />}
          >
            Add customer
          </Button>
        }
      />
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}
      <Paper
        elevation={0}
        className="w-full max-w-full overflow-hidden border border-slate-200"
      >
        <div className="table-scroll">
          <Table aria-label="Customer table" sx={{ minWidth: 680 }}>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {status === "loading" && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              )}
              {status !== "loading" && customers.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="center"
                    sx={{ py: 8, color: "text.secondary" }}
                  >
                    No customers yet. Create your first customer to see it here.
                  </TableCell>
                </TableRow>
              )}
              {customers.map((customer) => (
                <TableRow hover key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.status ?? "Active"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ServerTablePagination
          {...pagination}
          onPageChange={(page) => dispatch(setPage(page))}
          onLimitChange={(limit) => dispatch(setLimit(limit))}
        />
      </Paper>
    </>
  );
}
