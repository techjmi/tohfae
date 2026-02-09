export const USER_MENU_DATA = {
    yourLists: [
        { label: "Shopping List", href: "/lists/shopping" },
        { label: "Create a Wish List", href: "/lists/create" },
        { label: "Wish from Any Website", href: "/lists/wish" },
        { label: "Baby Wishlist", href: "/lists/baby" },
        { label: "Discover Your Style", href: "/lists/style" },
        { label: "Explore Showroom", href: "/lists/showroom" },
    ],
    yourAccount: [
        { label: "Your Account", href: "/account" },
        { label: "Your Orders", href: "/orders" },
        { label: "Your Wish List", href: "/wishlist" },
        { label: "Keep shopping for", href: "/recommendations" },
        { label: "Your Recommendations", href: "/recommendations" },
        { label: "Recalls and Product Safety Alerts", href: "/recalls" },
        { label: "Your Prime Membership", href: "/prime" },
        { label: "Your Prime Video", href: "/prime-video" },
        { label: "Your Subscribe & Save Items", href: "/subscribe-save" },
        { label: "Memberships & Subscriptions", href: "/memberships" },
        { label: "Your Seller Account", href: "/seller" },
        { label: "Content Library", href: "/content-library" },
        { label: "Devices", href: "/devices" },
        { label: "Register for a free Business Account", href: "/business" },
    ],
};

export const NAVBAR_LINKS = [
    { label: "Hello", href: "/" },
    { label: "Sign In", href: "/signin" },
    { label: "Returns & Orders", href: "/orders" },
];

export const MOBILE_MENU_DATA = [
    { label: "Home", href: "/", icon: "home" },
    { label: "Your Account", href: "/account", icon: "user" },
    { label: "Your Orders", href: "/orders", icon: "check" },
    { label: "Your Wish List", href: "/wishlist", icon: "heart" },
    { label: "Cart", href: "/cart", icon: "cart" },
    { label: "Settings", href: "/settings", icon: "settings" },
];

export const DUMMY_USER = {
    isLoggedIn: true, // Change to false to test logged out state
    name: "Shamim",
    email: "shamim@example.com",
    avatar: "/avatar.jpg",
};

