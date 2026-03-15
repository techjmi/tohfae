"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Form } from '@/shared/ui/from';
import Button from '@/shared/ui/button/Button';
import { AuthService } from '@/services/auth/auth.service';
import { AUTH_ROUTES } from '@/services/auth/auth.constant';
import { AUTH_TEXT } from '../auth.constant';
import { AUTH_STYLES } from '../auth.style';
import { FORGOT_PASSWORD_FORM_FIELDS, INITIAL_FORGOT_PASSWORD_FORM_DATA } from './forgot-password.helper';

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [formData, setFormData] = useState(INITIAL_FORGOT_PASSWORD_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await AuthService.forgotPassword(formData.email);

      if (response.success) {
        toast.success(response.message || 'Password reset OTP sent to your email');
        setTimeout(() => {
          router.push(`${AUTH_ROUTES.RESET_PASSWORD}?email=${encodeURIComponent(formData.email)}`);
        }, 2000);
      } else {
        throw new Error(response.message || 'Failed to send reset email');
      }
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
        toast.error('Please check the form for errors');
      } else {
        toast.error(error.message || 'Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={AUTH_STYLES.CONTAINER}>
      <div className={AUTH_STYLES.CARD}>
        <div className={AUTH_STYLES.HEADER.CONTAINER}>
          <h2 className={AUTH_STYLES.HEADER.TITLE}>
            {AUTH_TEXT.FORGOT_PASSWORD_TITLE}
          </h2>
          <p className={AUTH_STYLES.HEADER.SUBTITLE}>
            {AUTH_TEXT.FORGOT_PASSWORD_SUBTITLE}
          </p>
        </div>

        <Form
          fields={FORGOT_PASSWORD_FORM_FIELDS}
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          className={AUTH_STYLES.FORM.CONTAINER}
        >
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            variant="solid"
            color="primary"
          >
            {isLoading ? AUTH_TEXT.FORGOT_PASSWORD_LOADING : AUTH_TEXT.FORGOT_PASSWORD_BUTTON}
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

