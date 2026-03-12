// Centralized icons for easy reuse; pass `size` as prop
// Social
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebookMessenger,
  FaGoogle,
  FaGithub,
  FaWhatsapp,
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
  FiChevronLeft,
  FiChevronDown,
  FiShield,
  FiFileText,
  FiShare2,
  FiLink,
  FiCheckCircle,
  FiTrash2,
} from "react-icons/fi";

// Navigation / Controls
import {
  MdClose,
  MdAdd,
  MdRemove,
  MdMenu,
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdStarHalf,
  MdOutlineStar,
  MdStarBorder,
  MdArrowBack
} from "react-icons/md";

export const ICONS = {
  // Social
  google: FaGoogle,
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  instagram: FaInstagram,
  messenger: FaFacebookMessenger,
  github: FaGithub,
  whatsapp: FaWhatsapp,
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
  plus: MdAdd,
  remove: MdRemove,
  minus: MdRemove,
  share: FiShare2,
  link: FiLink,
  checkCircle: FiCheckCircle,
  trash: FiTrash2,
  delete: FiTrash2,
  // Navigation
  menu: MdMenu,
  arrowLeft: MdKeyboardArrowLeft,
  arrowRight: MdOutlineKeyboardArrowRight,
  arrowUp: MdKeyboardArrowUp,
  arrowDown: MdKeyboardArrowDown,
  chevronDown: FiChevronDown,
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
  chevronLeft: FiChevronLeft,
  shield: FiShield,
  document: FiFileText,
  arrowLeft: MdKeyboardArrowLeft,
  // Rating
  starHalf: MdStarHalf,
  star: MdOutlineStar,
  starBorder: MdStarBorder,
  back: MdArrowBack
};

export function Icon({ name, size = 18, color, className, ...props }) {
  const IconComponent = ICONS[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} color={color} className={className} {...props} />;
}
