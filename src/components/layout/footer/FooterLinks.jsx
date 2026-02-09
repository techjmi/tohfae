/**
 * FooterLinks Component
 * 
 * Footer navigation links section
 * 
 * Features:
 * - Categorized link groups
 * - Quick links
 * - Customer service links
 * - Company information links
 * 
 * Usage:
 * import FooterLinks from '@/components/layout/footer/FooterLinks';
 * <FooterLinks />
 */

"use client";
import { FOOTER_CONFIG } from "../../shared/constant/footer.constant";

export default function FooterLinks() {
    return (
        <div className="footer-links">
            {FOOTER_CONFIG.map((section) => (
                <div key={section.title} className="footer-links-section">
                    <h3 className="footer-links-section-title">{section.title}</h3>
                    <ul className="footer-links-section-list">
                        {section.links.map((link) => (
                            <li key={link.href} className="footer-links-section-list-item">
                                <a href={link.href} className="footer-links-section-list-item-link">
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

