/**
 * SocialLinks Component
 * 
 * Social media links section
 * 
 * Features:
 * - Social media icons (Facebook, Instagram, Twitter, etc.)
 * - Hover effects
 * - External links with proper attributes
 * 
 * Usage:
 * import SocialLinks from '@/components/layout/footer/SocialLinks';
 * <SocialLinks />
 */

"use client";
import { Icon } from "@/shared/icons";
import { SOCIAL_LINKS } from "./footer.constant";
import "./footer.style.css";

export default function SocialLinks() {
    return (
        <div className="footer-social-section">
            <h3 className="footer-social-title">{SOCIAL_LINKS[0].title}</h3>
            <div className="footer-social-icons">
                {SOCIAL_LINKS[0].links.map((social) => (
                    <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="footer-social-icon"
                    >
                        <Icon name={social.icon_name} size={24} />
                    </a>
                ))}
            </div>
        </div>
    );
}
