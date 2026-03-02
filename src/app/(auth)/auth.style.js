/**
 * Auth Pages Style Constants
 * Centralized styling for all authentication pages
 */

/**
 * Container styles for auth pages
 */
export const AUTH_STYLES = {
  // Main container (full screen centered)
  CONTAINER: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8",
  
  // Form wrapper (max width container)
  FORM_WRAPPER: "max-w-md w-full space-y-8",
  
  // Header section
  HEADER: {
    CONTAINER: "",
    TITLE: "mt-6 text-center text-3xl font-extrabold text-gray-900",
    SUBTITLE: "mt-2 text-center text-sm text-gray-600",
    LINK: "font-medium text-primary-600 hover:text-primary-500"
  },
  
  // Form section
  FORM: {
    CONTAINER: "mt-8 space-y-6",
    FIELDS_WRAPPER: "space-y-4",
    GRID_2_COL: "grid grid-cols-2 gap-4"
  },
  
  // Error message
  ERROR_MESSAGE: "p-4 rounded-md bg-red-50 text-red-800",
  
  // Links
  LINK: {
    FORGOT_PASSWORD: "font-medium text-primary-600 hover:text-primary-500",
    CONTAINER: "flex items-center justify-between"
  }
};

