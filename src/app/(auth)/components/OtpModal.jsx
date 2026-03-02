"use client";
import { useState, useEffect, useRef } from 'react';
import Modal from '@/shared/ui/modal/Modal';
import Button from '@/shared/ui/button/Button';
import { AuthService } from '@/services/auth/auth.service';
import { OTP_CONFIG } from '@/services/auth/auth.constant';
import { AUTH_TEXT } from '../auth.constant';

export default function OtpModal({ isOpen, onClose, email, onVerified }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

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
      setError('Please enter complete OTP');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await AuthService.verifyEmail(email, otpString);

      if (response.success) {
        // toast.success(response.message || 'Email verified successfully!');
        setMessage(response.message);
        setTimeout(() => {
          onVerified?.();
        }, 1500);
      } else {
        throw new Error(response.message || 'Verification failed');
      }
    } catch (err) {
      const errorMsg = err.message || 'Invalid OTP';
      setError(errorMsg);
      // toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await AuthService.resendOtp(email);

      if (response.success) {
        // toast.success(response.message || 'OTP resent successfully!');
        setMessage(response.message);
        setResendCooldown(OTP_CONFIG.RESEND_COOLDOWN_SECONDS);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        throw new Error(response.message || 'Failed to resend OTP');
      }
    } catch (err) {
      const errorMsg = err.message || 'Failed to resend OTP';
      setError(errorMsg);
      // toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {AUTH_TEXT.OTP_TITLE}
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          {AUTH_TEXT.OTP_SUBTITLE} <strong>{email}</strong>
        </p>

        {/* OTP Input */}
        <div className="flex gap-2 justify-center mb-4" onPaste={handlePaste}>
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
              className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-md focus:border-primary-500 focus:outline-none"
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Messages */}
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        {message && <p className="text-sm text-green-600 mb-4">{message}</p>}

        {/* Actions */}
        <div className="space-y-3">
          <Button
            fullWidth
            variant="solid"
            color="primary"
            onClick={handleVerify}
            disabled={isLoading || otp.join('').length !== OTP_CONFIG.LENGTH}
          >
            {isLoading ? AUTH_TEXT.OTP_VERIFY_LOADING : AUTH_TEXT.OTP_VERIFY_BUTTON}
          </Button>

          <Button
            fullWidth
            variant="ghost"
            color="neutral"
            onClick={handleResend}
            disabled={isLoading || resendCooldown > 0}
          >
            {resendCooldown > 0 ? `${AUTH_TEXT.OTP_RESEND_COOLDOWN} ${resendCooldown}s` : AUTH_TEXT.OTP_RESEND_BUTTON}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

