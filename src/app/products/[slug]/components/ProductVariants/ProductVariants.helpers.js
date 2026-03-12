/**
 * ProductVariants Helper Functions
 * Contains all business logic for variant selection and filtering
 */

/**
 * Get all unique attribute keys from variants
 *
 * Example:
 * Input: [
 *   { attributes: { size: 'S', color: 'Black' } },
 *   { attributes: { size: 'M', color: 'Red' } }
 * ]
 * Output: ['size', 'color']
 *
 * @param {Array} variants - Array of product variants
 * @returns {Array} - Array of unique attribute keys
 */
export const getAllAttributeKeys = (variants) => {
  // Step 1: Get all attributes from all variants
  // flatMap extracts attributes from each variant and flattens into one array
  // Step 2: Object.keys gets the keys (size, color, etc.)
  // Step 3: new Set removes duplicates
  // Step 4: [...] converts Set back to Array
  return [...new Set(variants.flatMap(v => Object.keys(v.attributes || {})))];
};

/**
 * Get selected attributes excluding a specific key
 *
 * Example:
 * Input:
 *   selectedAttributes = { size: 'M', color: 'Red' }
 *   excludeKey = 'color'
 * Output: { size: 'M' }
 *
 * Why? When showing available colors, we need to know what size is selected,
 * but we ignore the currently selected color.
 *
 * @param {Object} selectedAttributes - Currently selected attributes
 * @param {String} excludeKey - Key to exclude
 * @returns {Object} - Filtered attributes object
 */
export const getOtherSelectedAttributes = (selectedAttributes, excludeKey) => {
  // Step 1: Get all keys from selectedAttributes
  return Object.keys(selectedAttributes)
    // Step 2: Keep only keys that are NOT the excludeKey
    .filter(key => key !== excludeKey)
    // Step 3: Build a new object with only those keys
    .reduce((acc, key) => ({ ...acc, [key]: selectedAttributes[key] }), {});
};

/**
 * Filter variants that match given attributes
 *
 * Example:
 * Input:
 *   variants = [
 *     { attributes: { size: 'S', color: 'Black' } },
 *     { attributes: { size: 'M', color: 'Black' } },
 *     { attributes: { size: 'M', color: 'Red' } }
 *   ]
 *   attributes = { size: 'M' }
 * Output: [
 *   { attributes: { size: 'M', color: 'Black' } },
 *   { attributes: { size: 'M', color: 'Red' } }
 * ]
 *
 * @param {Array} variants - Array of product variants
 * @param {Object} attributes - Attributes to match
 * @returns {Array} - Filtered variants
 */
export const filterVariantsByAttributes = (variants, attributes) => {
  // Keep only variants where ALL given attributes match
  return variants.filter(variant => {
    // Check if every attribute key matches
    return Object.keys(attributes).every(
      key => variant.attributes[key] === attributes[key]
    );
  });
};

/**
 * Get unique values for a specific attribute from variants
 *
 * Example:
 * Input:
 *   variants = [
 *     { attributes: { size: 'M', color: 'Black' } },
 *     { attributes: { size: 'M', color: 'Red' } }
 *   ]
 *   attributeKey = 'color'
 * Output: ['Black', 'Red']
 *
 * @param {Array} variants - Array of product variants
 * @param {String} attributeKey - Attribute key to extract
 * @returns {Array} - Array of unique values
 */
export const getUniqueAttributeValues = (variants, attributeKey) => {
  // Step 1: Extract all values for this attribute
  // Step 2: Remove duplicates using Set
  // Step 3: Filter out null/undefined values
  return [...new Set(variants.map(v => v.attributes[attributeKey]))].filter(Boolean);
};

/**
 * Build variant groups dynamically based on selected attributes
 * This enables bidirectional filtering (size->color and color->size)
 *
 * REAL EXAMPLE:
 *
 * Variants in database:
 * [
 *   { id: 1, attributes: { size: 'S', color: 'Black' }, stock: 10 },
 *   { id: 2, attributes: { size: 'S', color: 'White' }, stock: 5 },
 *   { id: 3, attributes: { size: 'M', color: 'Black' }, stock: 20 },
 *   { id: 4, attributes: { size: 'M', color: 'Red' }, stock: 15 }
 * ]
 *
 * User selects: Size M
 * selectedAttributes = { size: 'M' }
 *
 * Output:
 * {
 *   size: [
 *     { value: 'S', variants: [variant1, variant2] },
 *     { value: 'M', variants: [variant3, variant4] }
 *   ],
 *   color: [
 *     { value: 'Black', variants: [variant3] },  // Only M-Black
 *     { value: 'Red', variants: [variant4] }     // Only M-Red
 *   ]
 * }
 *
 * Notice: White is NOT shown because it doesn't exist for Size M!
 *
 * @param {Array} variants - All product variants
 * @param {Object} selectedAttributes - Currently selected attributes
 * @returns {Object} - Grouped variants by attribute
 */
export const buildVariantGroups = (variants, selectedAttributes) => {
  const groups = {};

  // Step 1: Get all attribute types (size, color, etc.)
  const allAttributeKeys = getAllAttributeKeys(variants);

  // Step 2: For each attribute type (size, color)
  allAttributeKeys.forEach(attrKey => {

    // Step 3: Get OTHER selected attributes
    // If we're building color options, we need to know selected size
    // If we're building size options, we need to know selected color
    const otherSelectedAttrs = getOtherSelectedAttributes(selectedAttributes, attrKey);

    // Step 4: Filter variants that match OTHER attributes
    // Example: If size=M is selected, get all variants with size=M
    const relevantVariants = filterVariantsByAttributes(variants, otherSelectedAttrs);

    // Step 5: Get unique values for THIS attribute from filtered variants
    // Example: From M-sized variants, extract unique colors [Black, Red]
    const uniqueValues = getUniqueAttributeValues(relevantVariants, attrKey);

    // Step 6: Map each value to its variants
    groups[attrKey] = uniqueValues.map(value => ({
      value,
      variants: relevantVariants.filter(v => v.attributes[attrKey] === value)
    }));
  });

  return groups;
};

/**
 * Find matching variant based on new attribute selection
 * @param {Array} variants - All product variants
 * @param {Object} currentAttributes - Current selected attributes
 * @param {String} attributeKey - Key being changed
 * @param {String} attributeValue - New value for the key
 * @returns {Object|null} - Matching variant or null
 */
export const findMatchingVariant = (variants, currentAttributes, attributeKey, attributeValue) => {
  const newAttributes = { ...currentAttributes, [attributeKey]: attributeValue };
  
  return variants.find(variant => {
    return Object.keys(newAttributes).every(
      key => variant.attributes[key] === newAttributes[key]
    );
  });
};

/**
 * Check if a variant is available (in stock)
 * @param {Object} variant - Variant object
 * @returns {Boolean} - True if available
 */
export const isVariantAvailable = (variant) => {
  return variant?.inventory?.available > 0;
};

/**
 * Find the best matching variant for given attributes
 * Used when checking availability for a specific attribute value
 * 
 * @param {Array} variantsForValue - Variants with the specific attribute value
 * @param {Object} selectedAttributes - Currently selected attributes
 * @param {String} currentAttributeKey - Current attribute being checked
 * @returns {Object|null} - Best matching variant or null
 */
export const findBestMatchingVariant = (variantsForValue, selectedAttributes, currentAttributeKey) => {
  return variantsForValue.find(variant => {
    return Object.keys(selectedAttributes)
      .filter(key => key !== currentAttributeKey)
      .every(key => variant.attributes[key] === selectedAttributes[key]);
  });
};

/**
 * Check if attribute is a color attribute
 * @param {String} attributeKey - Attribute key to check
 * @returns {Boolean} - True if color attribute
 */
export const isColorAttribute = (attributeKey) => {
  return attributeKey.toLowerCase() === 'color';
};

