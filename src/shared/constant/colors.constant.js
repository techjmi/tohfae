export const UI_COLORS = {
  PRIMARY: '#f97316',
  INACTIVE: '#d1d5db',
};

export const PRODUCT_COLORS = {
  'White': '#FFFFFF',
  'Black': '#000000',
  'Gray': '#6B7280',
  'Grey': '#6B7280',
  'Red': '#DC2626',
  'Blue': '#2563EB',
  'Green': '#047857',
  'Yellow': '#FACC15',
  'Orange': '#EA580C',
  'Purple': '#9333EA',
  'Pink': '#EC4899',
  'Navy': '#1E3A8A',
  'Maroon': '#7F1D1D',
  'Beige': '#D4C5B9',
  'Brown': '#92400E',
  'Cream': '#FEF3C7',
  'Gold': '#F59E0B',
  'Silver': '#D1D5DB',
  'Olive': '#65A30D',
  'Teal': '#0D9488',
  'Cyan': '#06B6D4',
  'Indigo': '#4F46E5',
  'Violet': '#7C3AED',
  'Magenta': '#D946EF',
  'Lime': '#84CC16',
  'Mint': '#6EE7B7',
  'Coral': '#FB7185',
  'Peach': '#FDBA74',
  'Lavender': '#C4B5FD',
  'Turquoise': '#2DD4BF',
  'Burgundy': '#991B1B',
  'Charcoal': '#374151',
  'Ivory': '#FFFBEB',
  'Khaki': '#CA8A04',
  'Salmon': '#FCA5A5',
  'Sky': '#7DD3FC',
  'Tan': '#D97706',
};

export const getColorHex = (colorName) => {
  return PRODUCT_COLORS[colorName] || '#CCCCCC';
};

export const needsColorBorder = (colorName) => {
  const lightColors = ['White', 'Cream', 'Ivory', 'Yellow', 'Beige'];
  return lightColors.includes(colorName);
};

