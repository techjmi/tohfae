/**
 * HorizontalScroll - Continuous auto-scrolling horizontal container
 *
 * @param {React.ReactNode} children - Items to scroll
 * @param {number} speed - Scroll speed (0.5 = slow, 1 = normal, 2 = fast)
 * @param {boolean} loop - Enable infinite loop (default: true)
 * @param {boolean} stopOnInteraction - Pause on touch/drag (default: true)
 * @param {boolean} stopOnMouseEnter - Pause on hover (default: true)
 * @param {number} gap - Gap between items in pixels (default: 16)
 * @param {string} itemWidth - Fixed width for each item (default: '280px')
 * @param {string} className - Additional CSS classes
 */
"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import './horizontal-scroll.css';

const HorizontalScroll = ({
  children,
  speed = 1,
  loop = true,
  stopOnInteraction = true,
  stopOnMouseEnter = true,
  gap = 16,
  itemWidth = '280px',
  className = '',
}) => {
  const emblaOptions = {
    loop,
    dragFree: true,
    containScroll: false,
    align: 'start',
  };

  const autoScrollPlugin = AutoScroll({
    speed,
    playOnInit: true,
    stopOnInteraction,
    stopOnMouseEnter,
  });

  const [emblaRef] = useEmblaCarousel(emblaOptions, [autoScrollPlugin]);

  const items = React.Children.toArray(children);
  const displayItems = loop ? [...items, ...items, ...items] : items;

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`horizontal-scroll ${className}`}>
      <div className="horizontal-scroll__viewport" ref={emblaRef}>
        <div className="horizontal-scroll__container">
          {displayItems.map((item, index) => (
            <div
              key={index}
              className="horizontal-scroll__item"
              style={{
                width: itemWidth,
                minWidth: itemWidth,
                maxWidth: itemWidth,
                paddingRight: `${gap}px`
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;