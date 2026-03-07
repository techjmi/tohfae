/**
 * Cookie Policy Page
 * Server-side rendered legal page with i18n support
 */

import LegalPageWrapper from "@/components/common/LegalPageWrapper";
import { site_author } from "@/shared/constant/global-constant";
export const metadata = {
    title: "Cookie Policy - Tohfae",
    description: "Cookie Policy for Tohfae. Learn about how we use cookies and similar technologies.",
    noindex: true,
    keywords: "cookie policy, cookie policy tohfae, tohfae cookie policy",
    author: `${site_author}`,
};

export default function CookiePolicyPage() {
    return <LegalPageWrapper pageKey="cookie_policy" icon="info" />;
}

