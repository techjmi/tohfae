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
  FiSearch,
  FiEye,
  FiEyeOff,
  FiLock,
  FiPhone,
  FiCalendar,
  FiClock,
  FiCheck,
  FiAlertCircle,
  FiInfo,
  FiLoader,
  FiHome,
  FiSettings,
  FiChevronRight,
  
} from "react-icons/fi";

// Navigation / Controls
import {
  MdClose,
  MdAdd,
  MdRemove,
  MdMenu,
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdStarHalf,
  MdOutlineStar,
  MdStarBorder
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
  // Form / Input Icons
  search: FiSearch,
  eye: FiEye,
  eyeOff: FiEyeOff,
  lock: FiLock,
  phone: FiPhone,
  calendar: FiCalendar,
  clock: FiClock,
  check: FiCheck,
  alertCircle: FiAlertCircle,
  info: FiInfo,
  loader: FiLoader,
  home: FiHome,
  settings: FiSettings,
  chevronRight: FiChevronRight,
  // Rating
  starHalf: MdStarHalf,
  star: MdOutlineStar,
  starBorder: MdStarBorder,
};

export function Icon({ name, size = 18, color, className, ...props }) {
  const IconComponent = ICONS[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} color={color} className={className} {...props} />;
}
