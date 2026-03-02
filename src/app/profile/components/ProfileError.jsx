/**
 * Profile Error Component
 * Error state for profile page
 */

"use client";

import { Button } from '@/shared/ui/button';
import { PROFILE_TEXT } from '../profile.constant';

export default function ProfileError({ error, onRetry }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            {PROFILE_TEXT.ERROR.TITLE}
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <Button
            onClick={onRetry}
            color="danger"
            variant="solid"
            size="md"
          >
            {PROFILE_TEXT.ERROR.RETRY_BUTTON}
          </Button>
        </div>
      </div>
    </div>
  );
}

