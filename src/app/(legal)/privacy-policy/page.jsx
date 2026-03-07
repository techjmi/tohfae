/**
 * Privacy Policy Page
 * Server-side rendered legal page with i18n support
 */

import LegalPageWrapper from "@/components/common/LegalPageWrapper";
import { site_author } from "@/shared/constant/global-constant";

export const metadata = {
    title: "Privacy Policy - Tohfae",
    description: "Privacy Policy for Tohfae. Learn how we collect, use, and protect your personal information.",
    noindex: true,
    keywords: "privacy policy, privacy policy tohfae, tohfae privacy policy",
    author: `${site_author}`,
};

export default function PrivacyPolicyPage() {
    return <LegalPageWrapper pageKey="privacy_policy" icon="shield" />;
}

