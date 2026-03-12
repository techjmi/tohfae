/**
 * Cart Page
 *
 * Protected route - Only accessible to authenticated users
 * Displays user's shopping cart with items, summary, and checkout
 *
 * Features:
 * - Private route protection (redirects to login if not authenticated)
 * - Fetches cart data from backend
 * - Shows cart items with product details
 * - Cart summary with pricing
 * - Coupon application
 * - Checkout button
 */

import { PrivateRoute } from '@/components/guards';
import CartClient from './CartClient';

export const metadata = {
  title: 'Shopping Cart | Tohfae',
  description: 'View and manage your shopping cart',
};

export default function CartPage() {
  return (
    <PrivateRoute>
      <CartClient />
    </PrivateRoute>
  );
}
