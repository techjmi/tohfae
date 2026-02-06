//this is a utility file for state management helper functions

/**
 * Update a single property in state object
 * @param {Object} prevState - Previous state object
 * @param {String} key - Property key to update
 * @param {Any} value - New value
 * @returns {Object} New state object
 */
export const updateStateProperty = (prevState, key, value) => {
    return { ...prevState, [key]: value };
};

/**
 * Update multiple properties in state object
 * @param {Object} prevState - Previous state object
 * @param {Object} updates - Object with properties to update
 * @returns {Object} New state object
 */
export const updateStateProperties = (prevState, updates) => {
    return { ...prevState, ...updates };
};

/**
 * Remove a property from state object
 * @param {Object} prevState - Previous state object
 * @param {String} key - Property key to remove
 * @returns {Object} New state object without the key
 */
export const removeStateProperty = (prevState, key) => {
    const { [key]: _, ...rest } = prevState;
    return rest;
};

/**
 * Remove multiple properties from state object
 * @param {Object} prevState - Previous state object
 * @param {Array} keys - Array of property keys to remove
 * @returns {Object} New state object without the keys
 */
export const removeStateProperties = (prevState, keys) => {
    const newState = { ...prevState };
    keys.forEach(key => {
        delete newState[key];
    });
    return newState;
};

/**
 * Toggle a boolean property in state object
 * @param {Object} prevState - Previous state object
 * @param {String} key - Property key to toggle
 * @returns {Object} New state object with toggled value
 */
export const toggleStateProperty = (prevState, key) => {
    return { ...prevState, [key]: !prevState[key] };
};

/**
 * Reset state to initial values
 * @param {Object} initialState - Initial state object
 * @returns {Object} Initial state object
 */
export const resetState = (initialState) => {
    return { ...initialState };
};

/**
 * Merge arrays in state (useful for pagination, infinite scroll)
 * @param {Object} prevState - Previous state object
 * @param {String} key - Array property key
 * @param {Array} newItems - New items to append
 * @returns {Object} New state object with merged array
 */
export const appendToStateArray = (prevState, key, newItems) => {
    return {
        ...prevState,
        [key]: [...(prevState[key] || []), ...newItems]
    };
};

/**
 * Prepend items to array in state
 * @param {Object} prevState - Previous state object
 * @param {String} key - Array property key
 * @param {Array} newItems - New items to prepend
 * @returns {Object} New state object with prepended array
 */
export const prependToStateArray = (prevState, key, newItems) => {
    return {
        ...prevState,
        [key]: [...newItems, ...(prevState[key] || [])]
    };
};

/**
 * Update item in array by index
 * @param {Object} prevState - Previous state object
 * @param {String} key - Array property key
 * @param {Number} index - Index of item to update
 * @param {Any} newValue - New value for the item
 * @returns {Object} New state object with updated array
 */
export const updateStateArrayItem = (prevState, key, index, newValue) => {
    const newArray = [...(prevState[key] || [])];
    newArray[index] = newValue;
    return { ...prevState, [key]: newArray };
};

/**
 * Remove item from array by index
 * @param {Object} prevState - Previous state object
 * @param {String} key - Array property key
 * @param {Number} index - Index of item to remove
 * @returns {Object} New state object with updated array
 */
export const removeStateArrayItem = (prevState, key, index) => {
    const newArray = [...(prevState[key] || [])];
    newArray.splice(index, 1);
    return { ...prevState, [key]: newArray };
};

/**
 * Filter array in state
 * @param {Object} prevState - Previous state object
 * @param {String} key - Array property key
 * @param {Function} filterFn - Filter function
 * @returns {Object} New state object with filtered array
 */
export const filterStateArray = (prevState, key, filterFn) => {
    return {
        ...prevState,
        [key]: (prevState[key] || []).filter(filterFn)
    };
};

/**
 * Increment a numeric property
 * @param {Object} prevState - Previous state object
 * @param {String} key - Property key to increment
 * @param {Number} amount - Amount to increment (default: 1)
 * @returns {Object} New state object with incremented value
 */
export const incrementStateProperty = (prevState, key, amount = 1) => {
    return { ...prevState, [key]: (prevState[key] || 0) + amount };
};

/**
 * Decrement a numeric property
 * @param {Object} prevState - Previous state object
 * @param {String} key - Property key to decrement
 * @param {Number} amount - Amount to decrement (default: 1)
 * @returns {Object} New state object with decremented value
 */
export const decrementStateProperty = (prevState, key, amount = 1) => {
    return { ...prevState, [key]: (prevState[key] || 0) - amount };
};

