/**
 * LoginPrompt Component
 * 
 * Displays a message prompting users to login before customizing products
 */
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/shared/ui/button/Button';
import { Icon } from '@/shared/icons';
import { MESSAGES } from '../ProductCustomization.constants';
import '../ProductCustomization.css';

const LoginPrompt = ({ className = '' }) => {
  const router = useRouter();

  const handleLoginClick = () => {
    // Store current URL to redirect back after login
    const currentUrl = window.location.pathname + window.location.search;
    router.push(`/login?redirect=${encodeURIComponent(currentUrl)}`);
  };

  return (
    <div className={`login-prompt-container ${className}`}>
      <div className="login-prompt-icon">
        <Icon name="lock" size={48} className="text-gray-400" />
      </div>
      <p className="login-prompt-message">
        {MESSAGES.LOGIN_REQUIRED}
      </p>
      <Button
        onClick={handleLoginClick}
        variant="solid"
        color="primary"
        size="lg"
        className="login-prompt-button"
        aria-label="Login to customize product"
      >
        <Icon name="user" size={20} />
        <span className="ml-2">{MESSAGES.LOGIN_BUTTON}</span>
      </Button>
    </div>
  );
};

export default LoginPrompt;

