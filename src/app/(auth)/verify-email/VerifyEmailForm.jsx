"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/shared/ui/button/Button';
import { AuthService } from '@/services/auth/auth.service';
import { AUTH_ROUTES } from '@/services/auth/auth.constant';
import { OTP_CONFIG } from '@/services/auth/auth.constant';
import { AUTH_TEXT } from '../auth.constant';
import { AUTH_STYLES } from '../auth.style';

export default function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get('email');

  const [email, setEmail] = useState(emailFromQuery || '');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpSent, setOtpSent] = useState(!!emailFromQuery); // OTP is sent if coming from signup
  const inputRefs = useRef([]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < OTP_CONFIG.LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, OTP_CONFIG.LENGTH);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(Array(OTP_CONFIG.LENGTH).fill('')).slice(0, OTP_CONFIG.LENGTH);
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, OTP_CONFIG.LENGTH - 1)]?.focus();
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== OTP_CONFIG.LENGTH) {
      setError('Please enter complete OTP');
      return;
    }

    if (!email) {
      setError('Email is required');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await AuthService.verifyEmail(email, otpString);

      if (response.success) {
        setMessage(response.message || 'Email verified successfully!');
        setTimeout(() => {
          router.push(AUTH_ROUTES.LOGIN);
        }, 2000);
      } else {
        throw new Error(response.message || 'Verification failed');
      }
    } catch (err) {
      const errorMsg = err.message || 'Invalid OTP';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await AuthService.resendOtp(email, 'email-verification');

      if (response.success) {
        setMessage(response.message || 'OTP sent to your email');
        setOtpSent(true);
        setResendCooldown(OTP_CONFIG.RESEND_COOLDOWN_SECONDS);
        setOtp(['', '', '', '', '', '']);
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
      } else {
        throw new Error(response.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await AuthService.resendOtp(email, 'email-verification');

      if (response.success) {
        setMessage(response.message || 'OTP resent successfully');
        setResendCooldown(OTP_CONFIG.RESEND_COOLDOWN_SECONDS);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        throw new Error(response.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setError(err.message || 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={AUTH_STYLES.CONTAINER}>
      <div className={AUTH_STYLES.CARD}>
        <div className={AUTH_STYLES.HEADER.CONTAINER}>
          <h2 className={AUTH_STYLES.HEADER.TITLE}>
            {AUTH_TEXT.OTP_TITLE}
          </h2>
          <p className={AUTH_STYLES.HEADER.SUBTITLE}>
            {otpSent
              ? AUTH_TEXT.OTP_SUBTITLE
              : 'Enter your email to receive a verification code'}
          </p>
          {email && otpSent && (
            <p className="text-sm font-medium text-gray-900 mt-2">{email}</p>
          )}
        </div>

        <div className="space-y-6">
          {/* Email Input - Show if OTP not sent yet OR if no email from query */}
          {!otpSent && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          )}

          {/* OTP Input - Only show if OTP has been sent */}
          {otpSent && (
            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                />
              ))}
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}

          <div className="space-y-3">
            {/* Show "Send OTP" button if OTP not sent yet */}
            {!otpSent ? (
              <Button
                fullWidth
                variant="solid"
                color="primary"
                onClick={handleSendOtp}
                disabled={isLoading || !email}
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </Button>
            ) : (
              <>
                {/* Show "Verify" button if OTP has been sent */}
                <Button
                  fullWidth
                  variant="solid"
                  color="primary"
                  onClick={handleVerify}
                  disabled={isLoading || otp.join('').length !== OTP_CONFIG.LENGTH}
                >
                  {isLoading ? AUTH_TEXT.OTP_VERIFY_LOADING : AUTH_TEXT.OTP_VERIFY_BUTTON}
                </Button>

                {/* Show "Resend OTP" button if OTP has been sent */}
                <Button
                  fullWidth
                  variant="ghost"
                  color="neutral"
                  onClick={handleResend}
                  disabled={isLoading || resendCooldown > 0}
                >
                  {resendCooldown > 0 ? `${AUTH_TEXT.OTP_RESEND_COOLDOWN} ${resendCooldown}s` : AUTH_TEXT.OTP_RESEND_BUTTON}
                </Button>
              </>
            )}

            <div className="text-center">
              <Link href={AUTH_ROUTES.LOGIN} className={AUTH_STYLES.LINK.BACK_TO_LOGIN}>
                {AUTH_TEXT.BACK_TO_LOGIN}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

