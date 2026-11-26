import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PageHeader from "@/components/common/PageHeader";
import InputComponent from "@/components/form/InputComponent";
import DropDown from "@/components/form/DropDown";
import DateComponent from "@/components/form/DateComponent";
import TimePickerComponent from "@/components/form/TimePickerComponent";

const initialForm = {
  canvasser: "",
  chitObtained: "",
  date: "",
  chitId: "",
  customer: "",
  applicationType: "",
  time: "",
  phone: "",
  contactType: "Visit",
  purpose: "",
  feedback: "",
};

export default function CanvasserFollowUpPage() {
  const [form, setForm] = useState(initialForm);
  const [notice, setNotice] = useState("");
  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    setNotice(
      "Follow-up details are ready in this preview. The follow-up API is not configured, so nothing was sent.",
    );
  };
  return (
    <>
      <PageHeader
        title="Canvasser Follow-up"
        action={
          <Button
            component={Link}
            to="/sales"
            startIcon={<ArrowBackRoundedIcon />}
          >
            Back to sales
          </Button>
        }
        showHeaderActions
      />
      <Paper
        variant="outlined"
        className="mx-auto max-w-5xl rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6"
      >
        <Typography variant="subtitle1" fontWeight={700} color="#07124e">
          Canvasser
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Record customer interaction and track application and follow-up
          details.
        </Typography>
        {notice && (
          <Alert severity="info" className="my-3">
            {notice}
          </Alert>
        )}
        <Box component="form" onSubmit={submit} className="mt-4">
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <InputComponent
                required
                fullWidth
                label="Canvasser name"
                placeholder="e.g. Anitha Selvan"
                value={form.canvasser}
                onChange={update("canvasser")}
                maxLength={100}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <DropDown
                label="Chit application obtained"
                name="chitObtained"
                value={form.chitObtained}
                onChange={update("chitObtained")}
                data={["Yes", "No"].map((value) => ({ name: value, value }))}
                valueKey="value"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <DateComponent
                required
                label="Date"
                name="date"
                value={form.date}
                onChange={update("date")}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <DropDown
                label="Chit ID"
                name="chitId"
                value={form.chitId}
                onChange={update("chitId")}
                data={["MCSK/2025/0002", "MFC-01"].map((value) => ({
                  name: value,
                  value,
                }))}
                valueKey="value"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <InputComponent
                required
                fullWidth
                label="Customer name"
                placeholder="e.g. Anitha Selvan"
                value={form.customer}
                onChange={update("customer")}
                maxLength={100}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <DropDown
                label="Application type"
                name="applicationType"
                value={form.applicationType}
                onChange={update("applicationType")}
                data={["New", "Renewal"].map((value) => ({
                  name: value,
                  value,
                }))}
                valueKey="value"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TimePickerComponent
                label="Time in"
                name="time"
                value={form.time}
                onChange={update("time")}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <InputComponent
                fullWidth
                label="Mobile number"
                value={form.phone}
                onChange={update("phone")}
                inputProps={{
                  inputMode: "tel",
                  maxLength: 20,
                  pattern: "[+0-9 ()-]{7,20}",
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl>
                <FormLabel>Contact type</FormLabel>
                <RadioGroup
                  row
                  value={form.contactType}
                  onChange={update("contactType")}
                >
                  <FormControlLabel
                    value="Visit"
                    control={<Radio />}
                    label="Visit"
                  />
                  <FormControlLabel
                    value="Call"
                    control={<Radio />}
                    label="Call"
                  />
                </RadioGroup>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <DropDown
                label="Purpose of visit"
                name="purpose"
                value={form.purpose}
                onChange={update("purpose")}
                data={[
                  "Pending Due",
                  "Application follow-up",
                  "Document collection",
                  "Renewal",
                ].map((value) => ({ name: value, value }))}
                valueKey="value"
              />
            </Grid2>
            <Grid2 size={12}>
              <InputComponent
                fullWidth
                multiline
                rows={3}
                label="Customer feedback"
                value={form.feedback}
                onChange={update("feedback")}
                maxLength={1000}
              />
            </Grid2>
          </Grid2>
          <Box className="mt-5 flex justify-end gap-2 border-t border-slate-200 pt-4">
            <Button component={Link} to="/sales" color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit follow-up
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
