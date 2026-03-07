/**
 * Terms and Conditions Page
 * Server-side rendered legal page with i18n support
 */

import LegalPageWrapper from "@/components/common/LegalPageWrapper";
import { site_author } from "@/shared/constant/global-constant";

export const metadata = {
    title: "Terms and Conditions - Tohfae",
    description: "Terms and Conditions for Tohfae. Read our terms of service and user agreement.",
    noindex: true,
    keywords: "terms and conditions, terms and conditions tohfae, tohfae terms and conditions",
    author: `${site_author}`,
};

export default function TermsAndConditionsPage() {
    return <LegalPageWrapper pageKey="terms_conditions" icon="document" />;
}

