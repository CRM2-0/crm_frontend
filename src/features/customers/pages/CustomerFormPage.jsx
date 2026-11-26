import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import PageHeader from "@/components/common/PageHeader";
import CustomerForm from "../components/CustomerForm";
import { customerApi } from "../api/customerApi";
export default function CustomerFormPage() {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      setError("");
      await customerApi.create(values);
      navigate("/customers");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <PageHeader title="New customer" />
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}
      <CustomerForm onSubmit={handleSubmit} submitting={submitting} />
    </>
  );
}
