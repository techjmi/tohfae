export const INITIAL_RESET_PASSWORD_FORM_DATA = {
  email: '',
  otp: '',
  newPassword: '',
  confirmPassword: '',
};

export const RESET_PASSWORD_FORM_FIELDS = [
  {
    name: 'otp',
    label: 'OTP Code',
    type: 'text',
    placeholder: 'Enter 6-digit OTP',
    required: true,
    maxLength: 6,
    pattern: '[0-9]{6}',
  },
  {
    name: 'newPassword',
    label: 'New Password',
    type: 'password',
    placeholder: 'Enter new password',
    required: true,
    autoComplete: 'new-password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm new password',
    required: true,
    autoComplete: 'new-password',
  },
];

