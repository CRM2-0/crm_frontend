import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Paper, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { customerSchema } from "../validations/customerSchema";
export default function CustomerForm({ onSubmit, submitting }) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl p-4 md:p-6"
    >
      <Stack spacing={3}>
        {["name", "email", "phone"].map((name) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label={name[0].toUpperCase() + name.slice(1)}
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
        ))}
        <Button type="submit" variant="contained" disabled={submitting}>
          Create customer
        </Button>
      </Stack>
    </Paper>
  );
}
