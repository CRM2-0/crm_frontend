import {
  Avatar,
  Box,
  Button,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import MetricCard from "@/components/common/MetricCard";
import ReportPanel from "@/components/common/ReportPanel";
import FamilyChar3D from "../components/FamilyChar3D";

const members = [
  { name: "S. Sumathi", prize: true, position: "top-[5%] left-[63%]" },
  { name: "S. Sumathi", prize: true, position: "top-[12%] left-[8%]" },
  { name: "S. Sumathi", prize: false, position: "bottom-[12%] left-[8%]" },
  { name: "S. Sumathi", prize: true, position: "bottom-[5%] left-[63%]" },
];

export default function FamilyChitPage() {
  return (
    <>
      <PageHeader
        title="Family chit"
        action={
          <Button
            component={Link}
            to="/customer-360"
            startIcon={<ArrowBackRoundedIcon />}
          >
            Back to customers
          </Button>
        }
        showHeaderActions
      />
      <Grid2 container spacing={1.5} className="mb-5">
        <Grid2 size={{ xs: 6, md: 3 }}>
          <MetricCard label="Total family members" value="4" />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 3 }}>
          <MetricCard label="Prize won" value="2" accent="#27866b" />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 3 }}>
          <MetricCard label="Non prize" value="2" />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 3 }}>
          <MetricCard label="Total chit value" value="₹25,00,000" />
        </Grid2>
      </Grid2>
      <FamilyChar3D />
    </>
  );
}
