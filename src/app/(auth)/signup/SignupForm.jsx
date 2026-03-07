"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Form } from '@/shared/ui/from';
import Button from '@/shared/ui/button/Button';
import { AuthService } from '@/services/auth/auth.service';
import { AUTH_ROUTES } from '@/services/auth/auth.constant';
import SocialLogin from '../components/SocialLogin';
import OtpModal from '../components/OtpModal';
import { AUTH_TEXT } from '../auth.constant';
import { AUTH_STYLES } from '../auth.style';
import { SIGNUP_FORM_FIELDS, SIGNUP_GRID_FIELDS, INITIAL_SIGNUP_FORM_DATA } from './signup.helper';

export default function SignupForm() {
  const router = useRouter();

  const [formData, setFormData] = useState(INITIAL_SIGNUP_FORM_DATA);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setErrors({});

    try {
      const response = await AuthService.signup(formData);

      if (response.success) {
        // toast.success(response.message || 'Signup successful! Please verify your email.');
        setShowOtpModal(true);
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (error) {
      // Backend validation errors
      if (error.errors) {
        setErrors(error.errors);
      } else {
        const errorMsg = error.message || 'Something went wrong';
        setErrorMessage(errorMsg);
        // toast.error(errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerified = () => {
    setShowOtpModal(false);
    router.push(AUTH_ROUTES.LOGIN);
  };

  return (
    <>
      <div className={AUTH_STYLES.CONTAINER}>
        <div className={AUTH_STYLES.FORM_WRAPPER}>
          <div>
            <h2 className={AUTH_STYLES.HEADER.TITLE}>
              {AUTH_TEXT.SIGNUP_TITLE}
            </h2>
            <p className={AUTH_STYLES.HEADER.SUBTITLE}>
              {AUTH_TEXT.SIGNUP_SUBTITLE}{' '}
              <Link href={AUTH_ROUTES.LOGIN} className={AUTH_STYLES.HEADER.LINK}>
                {AUTH_TEXT.SIGNUP_SUBTITLE_LINK}
              </Link>
            </p>
          </div>

          <Form
            fields={SIGNUP_FORM_FIELDS}
            gridFields={SIGNUP_GRID_FIELDS}
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

            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              variant="solid"
              color="primary"
            >
              {isLoading ? AUTH_TEXT.SIGNUP_LOADING : AUTH_TEXT.SIGNUP_BUTTON}
            </Button>

            <SocialLogin />
          </Form>
        </div>
      </div>

      <OtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        email={formData.email}
        onVerified={handleOtpVerified}
      />
    </>
  );
}

