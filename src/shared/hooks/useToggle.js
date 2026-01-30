//this is a custom hook which will be used to handle the toggle of the element
import { useState } from 'react';

export const useToggle = (initialValue = false) => {
    const [value, setValue] = useState(initialValue);
    const toggle = () => setValue(!value);
    return [value, toggle];
};
