import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FullScreenLoader from '@/components/common/FullScreenLoader';

/** Displays feedback for each client-side route transition, including cached routes. */
export default function RouteLoadingBoundary({ children }) {
  const location = useLocation();
  const isInitialRender = useRef(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return undefined;
    }

    setIsLoading(true);
    const timer = window.setTimeout(() => setIsLoading(false), 300);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);

  return <>{children}{isLoading && <FullScreenLoader contained label="Loading page…" />}</>;
}
