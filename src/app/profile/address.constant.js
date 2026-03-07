/**
 * Address Constants
 * All constants related to address management
 */

import { website_name } from '@/shared/constant/global-constant';

// Address Labels
export const ADDRESS_LABELS = {
  HOME: 'home',
  WORK: 'work',
  OTHER: 'other'
};

// Address Form Fields
export const ADDRESS_FIELDS = {
  LABEL: {
    NAME: 'label',
    LABEL: 'Address Label',
    PLACEHOLDER: 'Select address type',
    REQUIRED: true
  },
  FULL_NAME: {
    NAME: 'fullName',
    LABEL: 'Full Name',
    PLACEHOLDER: 'Enter full name',
    REQUIRED: true
  },
  PHONE: {
    NAME: 'phone',
    LABEL: 'Phone Number',
    PLACEHOLDER: '+91 XXXXXXXXXX',
    REQUIRED: true
  },
  ADDRESS_LINE_1: {
    NAME: 'addressLine1',
    LABEL: 'Address Line 1',
    PLACEHOLDER: 'House No., Building Name',
    REQUIRED: true
  },
  ADDRESS_LINE_2: {
    NAME: 'addressLine2',
    LABEL: 'Address Line 2 (Optional)',
    PLACEHOLDER: 'Road name, Area, Colony',
    REQUIRED: false
  },
  CITY: {
    NAME: 'city',
    LABEL: 'City',
    PLACEHOLDER: 'Enter city',
    REQUIRED: true
  },
  STATE: {
    NAME: 'state',
    LABEL: 'State',
    PLACEHOLDER: 'Enter state',
    REQUIRED: true
  },
  PINCODE: {
    NAME: 'pincode',
    LABEL: 'Pincode',
    PLACEHOLDER: 'Enter pincode',
    REQUIRED: true
  },
  COUNTRY: {
    NAME: 'country',
    LABEL: 'Country',
    PLACEHOLDER: 'Enter country',
    REQUIRED: true
  },
  IS_DEFAULT: {
    NAME: 'isDefault',
    LABEL: 'Set as default address',
    REQUIRED: false
  }
};

// Address Form Text
export const ADDRESS_TEXT = {
  MODAL: {
    ADD_TITLE: 'Add New Address',
    EDIT_TITLE: 'Edit Address',
    CANCEL_BUTTON: 'Cancel',
    SAVE_BUTTON: 'Save Address',
    SAVING_BUTTON: 'Saving...'
  },
  SECTION: {
    TITLE: 'Saved Addresses',
    NO_ADDRESS: 'No addresses saved yet',
    ADD_BUTTON: 'Add New Address'
  },
  CARD: {
    DEFAULT_BADGE: 'Default',
    EDIT_BUTTON: 'Edit',
    DELETE_BUTTON: 'Delete',
    SET_DEFAULT_BUTTON: 'Set as Default'
  },
  DELETE: {
    TITLE: 'Delete Address',
    MESSAGE: 'Are you sure you want to delete this address?',
    CONFIRM_BUTTON: 'Delete',
    CANCEL_BUTTON: 'Cancel'
  },
  VALIDATION: {
    REQUIRED: 'This field is required',
    PHONE_INVALID: 'Please enter a valid phone number',
    PINCODE_INVALID: 'Please enter a valid pincode'
  }
};

// Indian States
export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Puducherry',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep',
  'Andaman and Nicobar Islands'
];

