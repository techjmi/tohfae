"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Form } from '@/shared/ui/from';
import Button from '@/shared/ui/button/Button';
import { AuthService } from '@/services/auth/auth.service';
import { AUTH_ROUTES } from '@/services/auth/auth.constant';
import { AUTH_TEXT } from '../auth.constant';
import { AUTH_STYLES } from '../auth.style';
import { RESET_PASSWORD_FORM_FIELDS, INITIAL_RESET_PASSWORD_FORM_DATA } from './reset-password.helper';

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get('email');

  const [formData, setFormData] = useState({
    ...INITIAL_RESET_PASSWORD_FORM_DATA,
    email: emailFromQuery || '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!emailFromQuery) {
      router.push(AUTH_ROUTES.FORGOT_PASSWORD);
    }
  }, [emailFromQuery, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    setErrors({});

    try {
      const response = await AuthService.resetPassword(
        formData.email,
        formData.otp,
        formData.newPassword,
        formData.confirmPassword
      );

      if (response.success) {
        toast.success(response.message || 'Password reset successfully!');
        setTimeout(() => {
          router.push(AUTH_ROUTES.LOGIN);
        }, 2000);
      } else {
        throw new Error(response.message || 'Failed to reset password');
      }
    } catch (error) {
      if (error.errors && Array.isArray(error.errors)) {
        // Handle validation errors array from backend
        const errorMessages = error.errors.map(err => `${err.field}: ${err.message}`).join(', ');
        toast.error(errorMessages);

        // Set field-specific errors
        const fieldErrors = {};
        error.errors.forEach(err => {
          fieldErrors[err.field] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        const errorMsg = error.message || 'Something went wrong';
        toast.error(errorMsg);
        setErrorMessage(errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await AuthService.resendOtp(formData.email, 'password-reset');

      if (response.success) {
        toast.success(response.message || 'OTP resent successfully');
      } else {
        throw new Error(response.message || 'Failed to resend OTP');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  if (!emailFromQuery) {
    return null;
  }

  return (
    <div className={AUTH_STYLES.CONTAINER}>
      <div className={AUTH_STYLES.CARD}>
        <div className={AUTH_STYLES.HEADER.CONTAINER}>
          <h2 className={AUTH_STYLES.HEADER.TITLE}>
            {AUTH_TEXT.RESET_PASSWORD_TITLE}
          </h2>
          <p className={AUTH_STYLES.HEADER.SUBTITLE}>
            {AUTH_TEXT.RESET_PASSWORD_SUBTITLE}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            OTP sent to: <span className="font-medium">{formData.email}</span>
          </p>
        </div>

        <Form
          fields={RESET_PASSWORD_FORM_FIELDS}
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          className={AUTH_STYLES.FORM.CONTAINER}
        >
          {errorMessage && (
            <div className={AUTH_STYLES.ERROR_MESSAGE}>
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="rounded-md bg-green-50 p-4 mb-4">
              <p className="text-sm text-green-800">{successMessage}</p>
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            variant="solid"
            color="primary"
          >
            {isLoading ? AUTH_TEXT.RESET_PASSWORD_LOADING : AUTH_TEXT.RESET_PASSWORD_BUTTON}
          </Button>

          <Button
            type="button"
            fullWidth
            variant="ghost"
            color="neutral"
            onClick={handleResendOtp}
            disabled={isLoading}
          >
            {AUTH_TEXT.RESEND_OTP}
          </Button>

          <div className="text-center mt-4">
            <Link href={AUTH_ROUTES.LOGIN} className={AUTH_STYLES.LINK.BACK_TO_LOGIN}>
              {AUTH_TEXT.BACK_TO_LOGIN}
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

