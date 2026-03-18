/**
 * Wishlist client component
 */
"use client";
import { useState } from 'react';
import { useWishlist } from '@/shared/hooks/wishlist';
import WishlistCard from './components/WishlistCard';
import WishlistHeader from './components/WishlistHeader';
import EmptyState from '@/shared/ui/empty-state';
import Button from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal';
import { WISHLIST_PAGE_STYLES, WISHLIST_GRID_STYLES } from './wishlist.style';
import { WISHLIST_TEXT } from './wishlist.helper.js';
// import { OrbitProgress } from 'react-loading-indicators';

const WishlistClient = () => {
  const { wishlist, loading, clearWishlist: clearWishlistHook } = useWishlist();
  const [showClearModal, setShowClearModal] = useState(false);

  const handleClearAll = async () => {
    try {
      await clearWishlistHook();
      setShowClearModal(false);
    } catch (error) {
      console.error('Failed to clear wishlist:', error);
    }
  };

  if (loading) {
    return (
      <div className={WISHLIST_PAGE_STYLES.CONTAINER}>
        <div className={WISHLIST_PAGE_STYLES.INNER_CONTAINER}>
          <div className="flex items-center justify-center min-h-[400px]">
            {/* <Atom color="#e11d48" size="medium" text="" textColor="" /> */}
            {/* <OrbitProgress color="#4740c8" size="medium" text="" textColor="" /> */}
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

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
                  key={item.id || item._id || item.slug}
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
