/**
 * ErrorBoundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 * 
 * Features:
 * - Catches errors in child components
 * - Displays custom error UI
 * - Logs errors to console (can be extended to log to external service)
 * - Provides reset functionality
 * - Works with Next.js App Router
 * 
 * Usage:
 * <ErrorBoundary>
 *   <YourApp />
 * </ErrorBoundary>
 */

"use client";

import React from 'react';
import ErrorComponent from './ErrorComponent';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    
    // State to track if an error has occurred
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  // This lifecycle method is called when an error is thrown
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
    };
  }

  // This lifecycle method is called after an error has been thrown
  componentDidCatch(error, errorInfo) {
    // Log error details to console
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error Info:', errorInfo);

    // Update state with error details
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  // Reset error boundary state
  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI
      return (
        <div>
          {/* Custom Error Component */}
          <ErrorComponent />

          {/* Development Mode: Show error details */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="fixed bottom-4 right-4 max-w-md bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg">
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-red-900 mb-2">
                    Development Error Details:
                  </h3>
                  <details className="text-xs text-red-800">
                    <summary className="cursor-pointer font-medium mb-2">
                      {this.state.error.toString()}
                    </summary>
                    <pre className="mt-2 overflow-auto max-h-40 bg-red-100 p-2 rounded text-xs">
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                  <button
                    onClick={this.resetErrorBoundary}
                    className="mt-3 px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
                <button
                  onClick={() => this.setState({ error: null })}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    // No error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;

