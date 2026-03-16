"use client";
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import Modal from '@/shared/ui/modal/Modal';
import Button from '@/shared/ui/button/Button';
import { AuthService } from '@/services/auth/auth.service';
import { OTP_CONFIG } from '@/services/auth/auth.constant';
import { AUTH_TEXT } from '../auth.constant';

export default function OtpModal({ isOpen, onClose, email, onVerified }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const inputRefs = useRef([]);

  // Countdown timer for cooldown
  useEffect(() => {
    if (cooldownSeconds > 0) {
      const timer = setTimeout(() => setCooldownSeconds(cooldownSeconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownSeconds]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
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

    const newOtp = pastedData.split('');
    while (newOtp.length < OTP_CONFIG.LENGTH) {
      newOtp.push('');
    }
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, OTP_CONFIG.LENGTH - 1)]?.focus();
  };

  const handleVerify = async () => {
    const otpString = otp.join('');

    if (otpString.length !== OTP_CONFIG.LENGTH) {
      toast.error('Please enter complete OTP');
      return;
    }

    setIsLoading(true);

    try {
      const response = await AuthService.verifyEmail(email, otpString);

      if (response.success) {
        toast.success(response.message || 'Email verified successfully!');
        setTimeout(() => {
          onVerified?.();
        }, 1500);
      } else {
        throw new Error(response.message || 'Verification failed');
      }
    } catch (err) {
      const errorMsg = err.message || 'Invalid OTP';
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldownSeconds > 0) return;

    setIsResending(true);

    try {
      const response = await AuthService.resendOtp(email);

      if (response.success) {
        toast.success(response.message || 'OTP resent successfully!');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        throw new Error(response.message || 'Failed to resend OTP');
      }
    } catch (err) {
      // Backend returns rate limit error with remainingSeconds
      const errorMsg = err.message || 'Failed to resend OTP';
      toast.error(errorMsg);

      // Check if backend returned cooldown info
      // handleApiError puts it in err.data
      if (err.data?.remainingSeconds) {
        setCooldownSeconds(err.data.remainingSeconds);
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" backdrop="blur">
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 text-center">
          {AUTH_TEXT.OTP_TITLE}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-6 text-center">
          {AUTH_TEXT.OTP_SUBTITLE} <strong className="block sm:inline mt-1 sm:mt-0">{email}</strong>
        </p>

        {/* Cooldown Timer Display */}
        {cooldownSeconds > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-red-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium">
                Please wait <span className="font-bold text-lg">{cooldownSeconds}</span> seconds before requesting another OTP
              </p>
            </div>
          </div>
        )}

        {/* OTP Input */}
        <div className="flex gap-1.5 sm:gap-2 justify-center mb-6" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-10 h-10 sm:w-12 sm:h-12 text-center text-base sm:text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-2 sm:space-y-3">
          <Button
            fullWidth
            variant="solid"
            color="primary"
            onClick={handleVerify}
            disabled={isLoading || isResending || otp.join('').length !== OTP_CONFIG.LENGTH}
          >
            {isLoading ? AUTH_TEXT.OTP_VERIFY_LOADING : AUTH_TEXT.OTP_VERIFY_BUTTON}
          </Button>

          <Button
            fullWidth
            variant="ghost"
            color="neutral"
            onClick={handleResend}
            disabled={isLoading || isResending || cooldownSeconds > 0}
          >
            {isResending
              ? 'Sending...'
              : cooldownSeconds > 0
                ? `Resend OTP (${cooldownSeconds}s)`
                : AUTH_TEXT.OTP_RESEND_BUTTON}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

