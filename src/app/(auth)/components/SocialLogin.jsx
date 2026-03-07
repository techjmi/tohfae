"use client";
import Button from '@/shared/ui/button/Button';
import { Icon } from '@/shared/icons';
import { SOCIAL_PROVIDERS } from '@/services/auth/auth.constant';
import { ENDPOINT } from '@/services/api/endpoint';
import { navigateToExternal } from '@/shared/utils/window';
import { AUTH_TEXT } from '../auth.constant';

export default function SocialLogin() {
  const handleSocialLogin = (provider) => {
    const url = ENDPOINT.AUTH[provider.toUpperCase()];
    navigateToExternal(url);
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">{AUTH_TEXT.SOCIAL_DIVIDER}</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          color="neutral"
          onClick={() => handleSocialLogin(SOCIAL_PROVIDERS.GOOGLE)}
          className="flex items-center justify-center gap-2"
        >
          <Icon name="google" size={20} />
          {AUTH_TEXT.GOOGLE_BUTTON}
        </Button>

        <Button
          variant="outline"
          color="neutral"
          onClick={() => handleSocialLogin(SOCIAL_PROVIDERS.FACEBOOK)}
          className="flex items-center justify-center gap-2"
        >
          <Icon name="facebook" size={20} />
          {AUTH_TEXT.FACEBOOK_BUTTON}
        </Button>
      </div>
    </div>
  );
}

