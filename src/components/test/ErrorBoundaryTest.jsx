/**
 * ErrorBoundaryTest Component
 * 
 * Test component to demonstrate Error Boundary functionality
 * This component intentionally throws an error when the button is clicked
 * 
 * Usage:
 * import ErrorBoundaryTest from '@/components/test/ErrorBoundaryTest';
 * <ErrorBoundaryTest />
 */

"use client";

import { useState } from 'react';
import Button from '@/shared/ui/button/Button';

export default function ErrorBoundaryTest() {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  if (shouldThrowError) {
    // This will trigger the Error Boundary
    throw new Error('Test Error: This is a simulated error to test the Error Boundary!');
  }

  return (
    <div className="border-2 border-dashed border-red-300 bg-red-50 rounded-lg p-6 max-w-md">
      <h3 className="text-lg font-semibold text-red-900 mb-2">
        🧪 Error Boundary Test
      </h3>
      <p className="text-sm text-red-700 mb-4">
        Click the button below to simulate an error and see the Error Boundary in action.
      </p>
      <Button
        variant="solid"
        color="danger"
        onClick={() => setShouldThrowError(true)}
      >
        Trigger Error
      </Button>
      <p className="text-xs text-red-600 mt-3">
        ⚠️ This will show the error fallback UI instead of crashing the app.
      </p>
    </div>
  );
}

