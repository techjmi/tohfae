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
// import { FOOTER_CONFIG } from "../../shared/constant/footer.constant";

export default function Footer() {
    return (
        <footer className="footer">
            <FooterLinks />
            <Newsletter />
            <SocialLinks />
        </footer>
    );
}


