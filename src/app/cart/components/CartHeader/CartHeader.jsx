"use client";

const CartHeader = ({ itemCount = 0, onClearCart }) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Shopping Cart
        </h1>
        <p className="text-base text-gray-600 mt-2">
          <span className="font-semibold text-gray-900">{itemCount}</span> {itemCount === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      {itemCount > 0 && onClearCart && (
        <button
          onClick={onClearCart}
          className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-200 hover:border-red-300 transition-colors"
        >
          Clear Cart
        </button>
      )}
    </div>
  );
};

export default CartHeader;
