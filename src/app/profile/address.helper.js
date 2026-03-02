/**
 * Address Form Helper
 * Configuration for address form fields
 */

import { INPUT_TYPE } from '@/shared/ui/from/form.constant';
import { ADDRESS_LABELS, INDIAN_STATES } from './address.constant';

/**
 * Address form fields configuration
 * Used for mapping and rendering form fields
 */
export const ADDRESS_FORM_FIELDS = [
  {
    name: 'label',
    label: 'Address Label',
    type: 'select',
    placeholder: 'Select address type',
    required: true,
    options: [
      { value: ADDRESS_LABELS.HOME, label: 'Home' },
      { value: ADDRESS_LABELS.WORK, label: 'Work' },
      { value: ADDRESS_LABELS.OTHER, label: 'Other' }
    ]
  },
  {
    name: 'fullName',
    label: 'Full Name',
    type: INPUT_TYPE.TEXT,
    placeholder: 'Enter full name',
    required: true
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: INPUT_TYPE.TEL,
    placeholder: '+91 XXXXXXXXXX',
    required: true
  },
  {
    name: 'addressLine1',
    label: 'Address Line 1',
    type: INPUT_TYPE.TEXT,
    placeholder: 'House No., Building Name',
    required: true
  },
  {
    name: 'addressLine2',
    label: 'Address Line 2 (Optional)',
    type: INPUT_TYPE.TEXT,
    placeholder: 'Road name, Area, Colony',
    required: false
  },
  {
    name: 'isDefault',
    label: 'Set as default address',
    type: 'checkbox',
    required: false
  }
];

/**
 * Address form grid fields (city/state, pincode/country)
 * These are rendered in a 2-column grid
 */
export const ADDRESS_GRID_FIELDS = [
  {
    row: 1,
    fields: [
      {
        name: 'city',
        label: 'City',
        type: INPUT_TYPE.TEXT,
        placeholder: 'Enter city',
        required: true
      },
      {
        name: 'state',
        label: 'State',
        type: 'select',
        placeholder: 'Select state',
        required: true,
        options: INDIAN_STATES.map(state => ({ value: state, label: state }))
      }
    ]
  },
  {
    row: 2,
    fields: [
      {
        name: 'pincode',
        label: 'Pincode',
        type: INPUT_TYPE.TEXT,
        placeholder: 'Enter pincode',
        required: true
      },
      {
        name: 'country',
        label: 'Country',
        type: INPUT_TYPE.TEXT,
        placeholder: 'Enter country',
        required: true
      }
    ]
  }
];

/**
 * Initial form data
 */
export const INITIAL_ADDRESS_FORM_DATA = {
  label: ADDRESS_LABELS.HOME,
  fullName: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
  country: 'India',
  isDefault: false
};

/**
 * Populate form data from address object
 */
export const populateFormData = (address) => {
  if (!address) return INITIAL_ADDRESS_FORM_DATA;
  
  return {
    label: address.label || ADDRESS_LABELS.HOME,
    fullName: address.fullName || '',
    phone: address.phone || '',
    addressLine1: address.addressLine1 || '',
    addressLine2: address.addressLine2 || '',
    city: address.city || '',
    state: address.state || '',
    pincode: address.pincode || '',
    country: address.country || 'India',
    isDefault: address.isDefault || false
  };
};

