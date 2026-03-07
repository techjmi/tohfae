/**
 * LegalPageHeader Component
 * Blue header with back button, icon, title, and language selector
 * Similar to Flipkart's legal page header design
 */

"use client";
import { useRouter } from "next/navigation";
import { Icon } from "@/shared/icons";
import LanguageSelector from "./LanguageSelector";
import "./legal-page-header.style.css";
import Button from "@/shared/ui/button";

export default function LegalPageHeader({ title, icon = "shield" }) {
    const router = useRouter();

    return (
        <div className="legal-page-header">
            <div className="legal-page-header-content">
                {/* Left Section: Back Button + Icon + Title */}
                <div className="legal-page-header-left">
                    <Button
                        className="legal-page-header-back"
                        onClick={() => router.back()}
                        aria-label="Go back"
                        variant="ghost"
                    >
                        <Icon name="back" size={28} />
                    </Button>

                    <div className="legal-page-header-icon">
                        <Icon name={icon} size={32} />
                    </div>

                    <h1 className="legal-page-header-title">{title}</h1>
                </div>

                {/* Right Section: Language Selector */}
                <div className="legal-page-header-right">
                    <LanguageSelector />
                </div>
            </div>
        </div>
    );
}

