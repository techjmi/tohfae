"use client";

import React, { useState } from 'react';
import './Tooltip.css';

/**
 * Tooltip Component
 * 
 * Usage:
 * <Tooltip content="Tooltip text">
 *   <button>Hover me</button>
 * </Tooltip>
 * 
 * Props:
 * @param {string|ReactNode} content - Tooltip content
 * @param {string} position - 'top' | 'bottom' | 'left' | 'right' (default: 'top')
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} children - Element to attach tooltip to
 */
export const Tooltip = ({
  content,
  position = 'top',
  className = '',
  children,
  delay = 200,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  if (!content) return children;

  return (
    <div 
      className="tooltip-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div className={`tooltip tooltip-${position} ${className}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;

