/**
 * ErrorBoundaryProvider
 * 
 * Client-side wrapper component that provides Error Boundary
 * for the entire application
 * 
 * Usage in layout.js:
 * import ErrorBoundaryProvider from '@/components/providers/ErrorBoundaryProvider';
 * 
 * <ErrorBoundaryProvider>
 *   {children}
 * </ErrorBoundaryProvider>
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

