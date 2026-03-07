"use client";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import LegalPageHeader from "./LegalPageHeader";
import "@/app/(legal)/legal.style.css";

/**
 * LegalPageWrapper Component
 * Reusable wrapper for all legal pages (Privacy Policy, Terms & Conditions, Cookie Policy)
 * Handles i18n and renders content from translation keys
 */
export default function LegalPageWrapper({
    pageKey,           // e.g., 'privacy_policy', 'terms_conditions', 'cookie_policy'
    icon = "shield",   // Icon for header
    namespace = "legal" // Translation namespace
}) {
    const { t } = useTranslation(namespace);

    // Get all sections for this page
    const sections = t(`${pageKey}.sections`, { returnObjects: true });
    const sectionsArray = Object.entries(sections || {});

    // Get current date in a readable format
    const getCurrentDate = () => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString('en-US', options);
    };

    return (
        <>
            <LegalPageHeader title={t(`${pageKey}.title`)} icon={icon} />
            
            <div className="legal-page-container">
                <div className="legal-page-content">
                    <h1 className="legal-page-title">{t(`${pageKey}.title`)}</h1>
                    <p className="legal-page-updated">
                        {t(`${pageKey}.last_updated`)}: {getCurrentDate()}
                    </p>

                    {/* Disclaimer */}
                    <div className="legal-disclaimer">
                        <p><em><strong>Disclaimer:</strong> {t(`${pageKey}.disclaimer`)}</em></p>
                    </div>

                    {/* Render all sections dynamically */}
                    {sectionsArray.map(([sectionKey, section]) => (
                        <section key={sectionKey} className="legal-section">
                            <h2>{section.title}</h2>
                            <p>{section.content}</p>
                            
                            {/* Render list items if they exist */}
                            {section.list && Array.isArray(section.list) && (
                                <ul>
                                    {section.list.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            )}

                            {/* Render detailed list items (with label and description) */}
                            {section.identity_data && (
                                <ul>
                                    <li><strong>{section.identity_data}:</strong> {section.identity_desc}</li>
                                    <li><strong>{section.contact_data}:</strong> {section.contact_desc}</li>
                                    <li><strong>{section.financial_data}:</strong> {section.financial_desc}</li>
                                    <li><strong>{section.transaction_data}:</strong> {section.transaction_desc}</li>
                                    <li><strong>{section.technical_data}:</strong> {section.technical_desc}</li>
                                    <li><strong>{section.usage_data}:</strong> {section.usage_desc}</li>
                                </ul>
                            )}

                            {/* Render sub-lists for specific sections */}
                            {section.process_orders && (
                                <ul>
                                    <li>{section.process_orders}</li>
                                    <li>{section.manage_account}</li>
                                    <li>{section.marketing}</li>
                                    <li>{section.improve_services}</li>
                                    <li>{section.legal_obligations}</li>
                                </ul>
                            )}

                            {section.access && (
                                <ul>
                                    <li>{section.access}</li>
                                    <li>{section.correct}</li>
                                    <li>{section.delete}</li>
                                    <li>{section.object}</li>
                                    <li>{section.portability}</li>
                                    <li>{section.withdraw}</li>
                                </ul>
                            )}

                            {/* Contact information */}
                            {section.email && (
                                <div className="legal-contact-info">
                                    <p>
                                        {section.email}:{' '}
                                        <a href="mailto:privacy@tohfae.com">privacy@tohfae.com</a>
                                    </p>
                                    <p>
                                        {section.phone}:{' '}
                                        <a href="tel:+1-800-123-4567">+1-800-123-4567</a>
                                    </p>
                                </div>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </>
    );
}

