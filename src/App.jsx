import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/routes/AppRoutes";
import FullScreenLoader from "@/components/common/FullScreenLoader";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<FullScreenLoader label="Loading application…" />}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}
