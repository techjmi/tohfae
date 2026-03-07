"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Form } from '@/shared/ui/from';
import Button from '@/shared/ui/button/Button';
import { AuthService } from '@/services/auth/auth.service';
import { signInSuccess, signInFailure, signInStart, selectIsLoading } from '@/redux/slice/authSlice';
import { AUTH_ROUTES, REDIRECT_ROUTES } from '@/services/auth/auth.constant';
import SocialLogin from '../components/SocialLogin';
import { AUTH_TEXT } from '../auth.constant';
import { AUTH_STYLES } from '../auth.style';
import { LOGIN_FORM_FIELDS, INITIAL_LOGIN_FORM_DATA , LOGIN_BUTTON_LABELS } from './login.helper';

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const [formData, setFormData] = useState(INITIAL_LOGIN_FORM_DATA);

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setErrors({});
    dispatch(signInStart());

    try {
      const response = await AuthService.signin(formData);

      if (response.success) {
        dispatch(signInSuccess(response));
        // toast.success(response.message || 'Login successful!');
        router.push(REDIRECT_ROUTES.AFTER_LOGIN);
      } else {
        throw new Error(response.message || 'Login failed');
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
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className={AUTH_STYLES.CONTAINER}>
      <div className={AUTH_STYLES.FORM_WRAPPER}>
        <div>
          <h2 className={AUTH_STYLES.HEADER.TITLE}>
            {AUTH_TEXT.LOGIN_TITLE}
          </h2>
          <p className={AUTH_STYLES.HEADER.SUBTITLE}>
            {AUTH_TEXT.LOGIN_SUBTITLE}{' '}
            <Link href={AUTH_ROUTES.SIGNUP} className={AUTH_STYLES.HEADER.LINK}>
              {AUTH_TEXT.LOGIN_SUBTITLE_LINK}
            </Link>
          </p>
        </div>

        <Form
          fields={LOGIN_FORM_FIELDS}
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

          <div className={AUTH_STYLES.LINK.CONTAINER}>
            <div className="text-sm">
              <Link href={AUTH_ROUTES.FORGOT_PASSWORD} className={AUTH_STYLES.LINK.FORGOT_PASSWORD}>
                {AUTH_TEXT.FORGOT_PASSWORD}
              </Link>
            </div>
          </div>

          <Button
            type={LOGIN_BUTTON_LABELS.Type}
            fullWidth
            disabled={isLoading}
            variant={LOGIN_BUTTON_LABELS.Variant}
            color={LOGIN_BUTTON_LABELS.Color}
          >
            {isLoading ? AUTH_TEXT.LOGIN_LOADING : AUTH_TEXT.LOGIN_BUTTON}
          </Button>

          <SocialLogin />
        </Form>
      </div>
    </div>
  );
}

