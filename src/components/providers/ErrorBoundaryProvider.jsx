/**
 * ErrorBoundaryProvider - Wraps app with error boundary
 */

"use client";

import { ErrorBoundary } from '@/shared/ui/error';

export default function ErrorBoundaryProvider({ children }) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}

