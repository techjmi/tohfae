/**
 * CompanyInfo Component
 *
 * Displays company contact and registered office information
 *
 * Features:
 * - Mail Us section
 * - Registered Office Address
 * - Contact details
 *
 * Usage:
 * import CompanyInfo from '@/components/layout/footer/CompanyInfo';
 * <CompanyInfo />
 */

"use client";
import { COMPANY_INFO } from "./footer.constant";

export default function CompanyInfo() {
    const { mail_us, registered_office } = COMPANY_INFO;

    return (
        <div className="footer-company-info">
            {/* Mail Us Section */}
            <div className="footer-company-section">
                <h3 className="footer-company-title">{mail_us.title}</h3>
                <address className="footer-company-address">
                    <p className="footer-company-name">{mail_us.company_name},</p>
                    <p>{mail_us.address_line1},</p>
                    <p>{mail_us.address_line2},</p>
                    <p>{mail_us.city}, {mail_us.zip},</p>
                    <p>{mail_us.state}, {mail_us.country}</p>
                </address>
            </div>

            {/* Registered Office Section */}
            <div className="footer-company-section">
                <h3 className="footer-company-title">{registered_office.title}</h3>
                <address className="footer-company-address">
                    <p className="footer-company-name">{registered_office.company_name},</p>
                    <p>{registered_office.address_line1},</p>
                    <p>{registered_office.address_line2},</p>
                    <p>{registered_office.city}, {registered_office.zip},</p>
                    <p>{registered_office.state}, {registered_office.country}</p>
                    {registered_office.cin && (
                        <p className="footer-company-cin">CIN: {registered_office.cin}</p>
                    )}
                    {registered_office.telephone && (
                        <p className="footer-company-phone">
                            Telephone: <a href={`tel:${registered_office.telephone}`}>{registered_office.telephone}</a>
                        </p>
                    )}
                </address>
            </div>
        </div>
    );
}

