"use client";
import { useState, useEffect } from 'react';
import { GuestWishlistService } from '@/services/wishlist';
import WishlistCard from './components/WishlistCard';
import WishlistHeader from './components/WishlistHeader';
import EmptyState from '@/shared/ui/empty-state';
import Button from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal';
import { WISHLIST_PAGE_STYLES, WISHLIST_GRID_STYLES } from './wishlist.style';
import { WISHLIST_TEXT } from './wishlist.helper';

const WishlistClient = () => {
  const [wishlist, setWishlist] = useState(() => GuestWishlistService.getWishlist());
  const [showClearModal, setShowClearModal] = useState(false);

  // Listen to storage changes to refresh wishlist when items are removed
  useEffect(() => {
    const handleStorageChange = () => {
      setWishlist(GuestWishlistService.getWishlist());
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen to custom event for same-tab updates
    window.addEventListener('wishlistUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleStorageChange);
    };
  }, []);

  const handleClearAll = () => {
    // Clear all items at once
    GuestWishlistService.clearWishlist();
    setWishlist([]);
    setShowClearModal(false);
  };

  return (
    <div className={WISHLIST_PAGE_STYLES.CONTAINER}>
      <div className={WISHLIST_PAGE_STYLES.INNER_CONTAINER}>
        {/* Header */}
        <WishlistHeader
          itemCount={wishlist.length}
          onClearClick={() => setShowClearModal(true)}
        />

        {/* Grid or Empty State */}
        {wishlist.length > 0 ? (
          <div className={WISHLIST_GRID_STYLES.CONTAINER}>
            <div className={WISHLIST_GRID_STYLES.GRID}>
              {wishlist.map((item) => (
                <WishlistCard
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            icon="heart"
            title={WISHLIST_TEXT.EMPTY_TITLE}
            description={WISHLIST_TEXT.EMPTY_DESCRIPTION}
            action={
              <Button
                color="primary"
                variant="filled"
                href="/products"
              >
                {WISHLIST_TEXT.BROWSE_PRODUCTS}
              </Button>
            }
          />
        )}
      </div>

      {/* Clear All Confirmation Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        size="sm"
        placement="center"
        backdrop="blur"
        header={{ title: WISHLIST_TEXT.CLEAR_ALL }}
        body={{ message: WISHLIST_TEXT.CLEAR_CONFIRM }}
        footer={[
          {
            label: "Cancel",
            onClick: () => setShowClearModal(false),
            variant: "outline",
            color: "neutral"
          },
          {
            label: "Clear All",
            onClick: handleClearAll,
            variant: "solid",
            color: "danger"
          }
        ]}
      />
    </div>
  );
};

export default WishlistClient;
