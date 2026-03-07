/**
 * Footer Component
 * Main footer for the application
 * 
 * Features:
 * - Company information
 * - Navigation links (About, Contact, etc.)
 * - Social media links
 * - Newsletter subscription
 * - Payment methods icons
 * - Copyright information
 * - Multi-column layout
 * */

"use client";
import FooterLinks from "./FooterLinks";
import Newsletter from "./Newsletter";
import SocialLinks from "./SocialLinks";
import CompanyInfo from "./CompanyInfo";
import { website_name } from "@/shared/constant/global-constant";
import "./footer.style.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <FooterLinks />
            <Newsletter />
            <SocialLinks />
            <CompanyInfo />

            {/* Copyright Section */}
            <div className="footer-copyright">
                <p>&copy; {currentYear} {website_name}. All rights reserved.</p>
            </div>
        </footer>
    );
}


