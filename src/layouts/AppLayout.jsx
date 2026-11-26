import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "@/components/layout/Sidebar";
import FullScreenLoader from "@/components/common/FullScreenLoader";

export default function AppLayout() {
  return (
    <Box className="min-h-screen">
      <Sidebar />
      <Box component="main" sx={{ ml: { xs: '48px', md: '210px' }, backgroundColor: '#f6f7fa', minHeight: '100vh' }}>
        <Box className="px-3 pb-4 pt-4 sm:px-5 md:px-7 md:pt-6">
        <Box className="relative min-h-[calc(100vh-112px)]">
          <Suspense
            fallback={<FullScreenLoader contained label="Loading page…" />}
          >
            <Outlet />
          </Suspense>
        </Box>
        </Box>
      </Box>
    </Box>
  );
}
