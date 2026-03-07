//this is the footer constant file for this web project
import { Navigation_Url, site_facebook_handle, site_twitter_handle, site_instagram_handle, site_linkedin_handle, website_name } from "@/shared/constant/global-constant";

export const FOOTER_TAGLINE = "Your trusted online shopping destination for quality products";

export const FOOTER_CONFIG = [
    {
        title: "Quick Links",
        links: [
            { label: "Home", href: Navigation_Url.HOME },
            { label: "About", href: Navigation_Url.ABOUT },
            { label: "Contact", href: Navigation_Url.CONTACT },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Blog", href: Navigation_Url.BLOG },
            { label: "Documentation", href: "/docs" },
            { label: "Help Center", href: "/help" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Terms & Conditions", href: Navigation_Url.TERMS },
            { label: "Privacy Policy", href: Navigation_Url.PRIVACY },
            { label: "Cookie Policy", href: Navigation_Url.COOKIE },
        ],
    },
];

export const SOCIAL_LINKS = [
    {
    title: "Follow us on",
    links: [
    { name: "Facebook", href: site_facebook_handle, icon_name: "facebook" },
    { name: "Twitter", href: site_twitter_handle, icon_name: "twitter" },
    { name: "Instagram", href: site_instagram_handle, icon_name: "instagram" },
    { name: "LinkedIn", href: site_linkedin_handle, icon_name: "linkedin" },]
    }
];
export const NEWSLETTER_CONFIG = {
    title: "Join our newsletter",
    description: "Get the latest updates and offers",
    placeholder: "Enter your email address",
    button_label: "Subscribe",
    href: Navigation_Url.NEWSLETTER,
};
export const COMPANY_INFO = {
    mail_us: {
        title: "Mail Us:",
        company_name: website_name,
        address_line1: "123 Business ABC, XYZ- 123456",
        address_line2: "ABC, XYZ- 123456",
        city: "ABC",
        state: "ABC",
        zip: "123456",
        country: "ABC"
    },
    registered_office: {
        title: "Registered Office Address:",
        company_name: website_name,
        address_line1: "123 Business ABC, XYZ- 123456",
        address_line2: "ABC, XYZ- 123456",
        city: "ABC",
        state: "ABC",
        zip: "123456",
        country: "ABC",
        cin: "XYZ123456789",
        telephone: "123-456-7890"
    }
};
export const help_section = [
    {
        title: "Help",
        links: [
            { label: "Help Center", href: Navigation_Url.HELP_CENTER },
            { label: "Contact Us", href: Navigation_Url.CONTACT },
            { label: "FAQ", href: Navigation_Url.FAQ },
        ],
    }
];