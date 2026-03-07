/**
 * LanguageSelector Component
 * Dropdown to switch between languages
 */

"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "@/i18n/config";
import { Icon } from "@/shared/icons";
import "./language-selector.style.css";

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('en');

    useEffect(() => {
        // Get language from localStorage or default to 'en'
        const savedLanguage = localStorage.getItem('language') || 'en';
        setCurrentLanguage(savedLanguage);
        i18n.changeLanguage(savedLanguage);
    }, [i18n]);

    const handleLanguageChange = (langCode) => {
        setCurrentLanguage(langCode);
        i18n.changeLanguage(langCode);
        localStorage.setItem('language', langCode);
        setIsOpen(false);
    };

    const currentLang = LANGUAGES.find(lang => lang.code === currentLanguage);

    return (
        <div className="language-selector">
            <button
                className="language-selector-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Select Language"
            >
                <span className="language-selector-text">{currentLang?.nativeName}</span>
                <Icon name="chevronDown" size={16} className={`language-selector-icon ${isOpen ? 'open' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="language-selector-overlay" onClick={() => setIsOpen(false)} />
                    <div className="language-selector-dropdown">
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                className={`language-selector-option ${currentLanguage === lang.code ? 'active' : ''}`}
                                onClick={() => handleLanguageChange(lang.code)}
                            >
                                <span className="language-selector-option-name">{lang.nativeName}</span>
                                {currentLanguage === lang.code && (
                                    <Icon name="check" size={16} className="language-selector-check" />
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

