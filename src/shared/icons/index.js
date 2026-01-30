// Centralized icons for easy reuse; pass `size` as prop
// Social
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebookMessenger,
} from "react-icons/fa";

// UI / General
import {
  FiMail,
  FiDownload,
  FiMapPin,
  FiHeart,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

// Navigation / Controls
import {
  MdClose,
  MdAdd,
  MdRemove,
  MdMenu,
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

export const ICONS = {
  // Social
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  instagram: FaInstagram,
  messenger: FaFacebookMessenger,
  // User / Commerce
  cart: FiShoppingCart,
  user: FiUser,
  heart: FiHeart,
  // UI
  mail: FiMail,
  download: FiDownload,
  location: FiMapPin,
  close: MdClose,
  add: MdAdd,
  remove: MdRemove,
  // Navigation
  menu: MdMenu,
  arrowLeft: MdKeyboardArrowLeft,
  arrowRight: MdOutlineKeyboardArrowRight,
};

export function Icon({ name, size = 18, color, className, ...props }) {
  const IconComponent = ICONS[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} color={color} className={className} {...props} />;
}
